import ignore from 'ignore';
import type { ProviderInfo } from '~/types/model';
import type { Template } from '~/types/template';
import { STARTER_TEMPLATES } from './constants';
import Cookies from 'js-cookie';

const starterTemplateSelectionPrompt = (templates: Template[]) => `
You are an experienced developer who helps people choose the best starter template for their projects.

Available templates:
<template>
  <name>blank</name>
  <description>Empty starter for simple scripts and trivial tasks that don't require a full template setup</description>
  <tags>basic, script</tags>
</template>
${templates
  .map(
    (template) => `
<template>
  <name>${template.name}</name>
  <description>${template.description}</description>
  ${template.tags ? `<tags>${template.tags.join(', ')}</tags>` : ''}
</template>
`,
  )
  .join('\n')}

Response Format:
<selection>
  <templateName>{selected template name}</templateName>
  <title>{a proper title for the project}</title>
</selection>

Examples:

<example>
User: I need to build a todo app
Response:
<selection>
  <templateName>react-basic-starter</templateName>
  <title>Simple React todo application</title>
</selection>
</example>

<example>
User: Write a script to generate numbers from 1 to 100
Response:
<selection>
  <templateName>blank</templateName>
  <title>script to generate numbers from 1 to 100</title>
</selection>
</example>

Instructions:
1. For trivial tasks and simple scripts, always recommend the blank template
2. For more complex projects, recommend templates from the provided list
3. Follow the exact XML format
4. Consider both technical requirements and tags
5. If no perfect match exists, recommend the closest option

Important: Provide only the selection tags in your response, no additional text.
MOST IMPORTANT: YOU DONT HAVE TIME TO THINK JUST START RESPONDING BASED ON HUNCH 
`;

const templates: Template[] = STARTER_TEMPLATES.filter((t) => !t.name.includes('shadcn'));

const parseSelectedTemplate = (llmOutput: string): { template: string; title: string } | null => {
  try {
    // Extract content between <templateName> tags
    const templateNameMatch = llmOutput.match(/<templateName>(.*?)<\/templateName>/);
    const titleMatch = llmOutput.match(/<title>(.*?)<\/title>/);

    if (!templateNameMatch) {
      return null;
    }

    return { template: templateNameMatch[1].trim(), title: titleMatch?.[1].trim() || 'Untitled Project' };
  } catch (error) {
    console.error('Error parsing template selection:', error);
    return null;
  }
};

export const selectStarterTemplate = async (options: { message: string; model: string; provider: ProviderInfo }) => {
  const { message, model, provider } = options;
  const requestBody = {
    message,
    model,
    provider,
    system: starterTemplateSelectionPrompt(templates),
  };
  const response = await fetch('/api/llmcall', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
  const respJson: { text: string } = await response.json();
  console.log(respJson);

  const { text } = respJson;
  const selectedTemplate = parseSelectedTemplate(text);

  if (selectedTemplate) {
    return selectedTemplate;
  } else {
    console.log('No template selected, using blank template');

    return {
      template: 'blank',
      title: '',
    };
  }
};

const getGitHubRepoContent = async (
  repoName: string,
  path: string = '',
): Promise<{ name: string; path: string; content: string }[]> => {
  const baseUrl = 'https://api.github.com';

  try {
    const token = Cookies.get('githubToken') || import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Add your GitHub token if needed
    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    // Fetch contents of the path
    const response = await fetch(`${baseUrl}/repos/${repoName}/contents/${path}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any = await response.json();

    // If it's a single file, return its content
    if (!Array.isArray(data)) {
      if (data.type === 'file') {
        // If it's a file, get its content
        const content = atob(data.content); // Decode base64 content
        return [
          {
            name: data.name,
            path: data.path,
            content,
          },
        ];
      }
    }

    // Process directory contents recursively
    const contents = await Promise.all(
      data.map(async (item: any) => {
        if (item.type === 'dir') {
          // Recursively get contents of subdirectories
          return await getGitHubRepoContent(repoName, item.path);
        } else if (item.type === 'file') {
          // Fetch file content
          const fileResponse = await fetch(item.url, {
            headers,
          });
          const fileData: any = await fileResponse.json();
          const content = atob(fileData.content); // Decode base64 content

          return [
            {
              name: item.name,
              path: item.path,
              content,
            },
          ];
        }

        return [];
      }),
    );

    // Flatten the array of contents
    return contents.flat();
  } catch (error) {
    console.error('Error fetching repo contents:', error);
    throw error;
  }
};

export async function getTemplates(templateName: string, title?: string) {
  const template = STARTER_TEMPLATES.find((t) => t.name == templateName);

  if (!template) {
    return null;
  }

  const githubRepo = template.githubRepo;
  const files = await getGitHubRepoContent(githubRepo);

  let filteredFiles = files;

  /*
   * ignoring common unwanted files
   * exclude    .git
   */
  filteredFiles = filteredFiles.filter((x) => x.path.startsWith('.git') == false);

  // exclude    lock files
  const comminLockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
  filteredFiles = filteredFiles.filter((x) => comminLockFiles.includes(x.name) == false);

  // exclude    .bolt
  filteredFiles = filteredFiles.filter((x) => x.path.startsWith('.bolt') == false);

  // check for ignore file in .bolt folder
  const templateIgnoreFile = files.find((x) => x.path.startsWith('.bolt') && x.name == 'ignore');

  const filesToImport = {
    files: filteredFiles,
    ignoreFile: [] as typeof filteredFiles,
  };

  if (templateIgnoreFile) {
    // redacting files specified in ignore file
    const ignorepatterns = templateIgnoreFile.content.split('\n').map((x) => x.trim());
    const ig = ignore().add(ignorepatterns);

    // filteredFiles = filteredFiles.filter(x => !ig.ignores(x.path))
    const ignoredFiles = filteredFiles.filter((x) => ig.ignores(x.path));

    filesToImport.files = filteredFiles;
    filesToImport.ignoreFile = ignoredFiles;
  }

  const assistantMessage = `
<boltArtifact id="imported-files" title="${title || 'Importing Starter Files'}" type="bundled">
${filesToImport.files
  .map(
    (file) =>
      `<boltAction type="file" filePath="${file.path}">
${file.content}
</boltAction>`,
  )
  .join('\n')}
</boltArtifact>
`;
  let userMessage = ``;
  const templatePromptFile = files.filter((x) => x.path.startsWith('.bolt')).find((x) => x.name == 'prompt');

  if (templatePromptFile) {
    userMessage = `
INSTRUÇÕES DO TEMPLATE:
${templatePromptFile.content}

IMPORTANTE: Não se esqueça de instalar as dependências antes de executar o aplicativo
---
`;
  }

  if (filesToImport.ignoreFile.length > 0) {
    userMessage =
      userMessage +
      `
REGRAS DE ACESSO AO ARQUIVO ESTRICTO - LEIA COM ATENÇÃO:

Os seguintes arquivos são de leitura e nunca devem ser modificados:
${filesToImport.ignoreFile.map((file) => `- ${file.path}`).join('\n')}

Permitidas ações:
✓ Importar esses arquivos como dependências
✓ Ler desses arquivos
✓ Referência esses arquivos

Ações proibidas:
❌ Modificar qualquer conteúdo dentro desses arquivos
❌ Remover esses arquivos
❌ Renomear esses arquivos
❌ Mover esses arquivos
❌ Criar novas versões desses arquivos
❌ Sugerir alterações para esses arquivos

Qualquer tentativa de modificar esses arquivos protegidos resultará na imediata interrupção da operação.

Se precisar fazer alterações à funcionalidade, crie novos arquivos em vez de modificar os protegidos acima.
---
`;
  }

  userMessage += `
---
O template importado está concluído, e você pode agora usar os arquivos importados,
edite apenas os arquivos que precisam ser alterados, e você pode criar novos arquivos conforme necessário.
NÃO EDITE/ESCREVA QUALQUER ARQUIVO QUE JÁ EXISTE NO PROJETO E NÃO PRECISA SER MODIFICADO
---
Agora que o Template está importado, continue com minha solicitação original
`;

  return {
    assistantMessage,
    userMessage,
  };
}
