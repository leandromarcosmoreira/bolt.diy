# bolt.diy

[![bolt.diy: Desenvolvimento Web Full-Stack com IA no Navegador](./public/social_preview_index.jpg)](https://bolt.diy)

Bem-vindo ao bolt.diy, a versão open source oficial do Bolt.new, que permite escolher o LLM que você usa para cada prompt! Atualmente, você pode usar modelos da OpenAI, Anthropic, Ollama, OpenRouter, Gemini, LMStudio, Mistral, xAI, HuggingFace, DeepSeek ou Groq — e é fácil estender para qualquer outro modelo suportado pelo Vercel AI SDK! Veja as instruções abaixo para rodar localmente e adicionar mais modelos.

-----
Confira a [Documentação do bolt.diy](https://stackblitz-labs.github.io/bolt.diy/) para instruções oficiais de instalação e mais informações.

-----
Além disso, [este post fixado na nossa comunidade](https://thinktank.ottomator.ai/t/videos-tutorial-helpful-content/3243) tem vários recursos incríveis para rodar e implantar o bolt.diy por conta própria!

Também lançamos um agente experimental chamado "bolt.diy Expert" que responde dúvidas comuns sobre o bolt.diy. Acesse no [oTTomator Live Agent Studio](https://studio.ottomator.ai/).

O bolt.diy foi criado por [Cole Medin](https://www.youtube.com/@ColeMedin), mas rapidamente virou um grande esforço comunitário para construir o MELHOR assistente de código com IA open source!

## Índice

- [Participe da Comunidade](#participe-da-comunidade)
- [Funcionalidades Solicitadas](#funcionalidades-solicitadas)
- [Funcionalidades](#funcionalidades)
- [Configuração](#configuracao)
- [Rodando a Aplicação](#rodando-a-aplicacao)
- [Scripts Disponíveis](#scripts-disponiveis)
- [Contribuindo](#contribuindo)
- [Roadmap](#roadmap)
- [FAQ](#faq)

## Participe da comunidade

[Entre na comunidade bolt.diy aqui, no oTTomator Think Tank!](https://thinktank.ottomator.ai)

## Gestão do projeto

O bolt.diy é um esforço comunitário! Ainda assim, o time principal de contribuidores busca organizar o projeto de forma que você entenda onde estão os focos atuais.

Se quiser saber no que estamos trabalhando, o que planejamos ou como contribuir, confira o [guia de gestão do projeto](./PROJECT.md) para começar fácil.

## Funcionalidades Solicitadas

- ✅ Integração OpenRouter (@coleam00)
- ✅ Integração Gemini (@jonathands)
- ✅ Gerar modelos Ollama automaticamente do que está baixado (@yunatamos)
- ✅ Filtrar modelos por provedor (@jasonm23)
- ✅ Baixar projeto como ZIP (@fabwaseem)
- ✅ Melhorias no prompt principal do bolt.new em `app\lib\.server\llm\prompts.ts` (@kofi-bhr)
- ✅ Integração DeepSeek API (@zenith110)
- ✅ Integração Mistral API (@ArulGandhi)
- ✅ Integração "Open AI Like" API (@ZerxZ)
- ✅ Sincronizar arquivos (sync one way) para pasta local (@muzafferkadir)
- ✅ Containerizar o app com Docker para instalação fácil (@aaronbolton)
- ✅ Publicar projetos direto no GitHub (@goncaloalves)
- ✅ Inserir chaves de API pela interface (@ali00209)
- ✅ Integração xAI Grok Beta (@milutinke)
- ✅ Integração LM Studio (@karrot0)
- ✅ Integração HuggingFace (@ahsan3219)
- ✅ Terminal Bolt para ver saída dos comandos LLM (@thecodacus)
- ✅ Streaming da saída de código (@thecodacus)
- ✅ Reverter código para versão anterior (@wonderwhy-er)
- ✅ Backup e restauração do histórico de chat (@sidbetatester)
- ✅ Integração Cohere (@hasanraiyan)
- ✅ Comprimento dinâmico de tokens máximos do modelo (@hasanraiyan)
- ✅ Melhor aprimoramento de prompt (@SujalXplores)
- ✅ Cache de prompts (@SujalXplores)
- ✅ Carregar projetos locais no app (@wonderwhy-er)
- ✅ Integração Together (@mouimet-infinisoft)
- ✅ Mobile friendly (@qwikode)
- ✅ Melhor aprimoramento de prompt (@SujalXplores)
- ✅ Anexar imagens aos prompts (@atrokhym)(@stijnus)
- ✅ Adicionado botão Git Clone (@thecodacus)
- ✅ Importar Git por URL (@thecodacus)
- ✅ PromptLibrary com variações de prompts para diferentes casos de uso (@thecodacus)
- ✅ Detectar package.json e comandos para auto instalar & rodar preview para pasta e importação git (@wonderwhy-er)
- ✅ Ferramenta de seleção para mudanças visuais (@emcconnell)
- ✅ Detectar erros no terminal e pedir para o bolt corrigir (@thecodacus)
- ✅ Detectar erros no preview e pedir para o bolt corrigir (@wonderwhy-er)
- ✅ Adicionar opções de template inicial (@thecodacus)
- ✅ Integração Perplexity (@meetpateltech)
- ✅ Integração AWS Bedrock (@kunjabijukchhe)
- ✅ Adicionar "Diff View" para ver mudanças (@toddyclipsgg)
- ⬜ **ALTA PRIORIDADE** - Evitar que o bolt reescreva arquivos com tanta frequência (file locking e diffs)
- ⬜ **ALTA PRIORIDADE** - Melhor prompting para LLMs menores (janela de código às vezes não inicia)
- ⬜ **ALTA PRIORIDADE** - Rodar agentes no backend ao invés de uma única chamada de modelo
- ✅ Deploy direto para Netlify (@xKevIsDev)
- ⬜ Integração Supabase
- ⬜ Planejar projeto em arquivo MD para melhores resultados/transparência
- ⬜ Integração VSCode com confirmações tipo git
- ⬜ Upload de documentos para conhecimento — templates de design, base de código para referência de estilo, etc.
- ⬜ Prompt por voz
- ⬜ Integração Azure Open AI API
- ⬜ Integração Vertex AI
- ⬜ Integração Granite
- ✅ Janela popout para Web Container(@stijnus)
- ✅ Alterar tamanho da janela popout (@stijnus)

## Funcionalidades

- **Desenvolvimento web full-stack com IA** para **aplicações NodeJS** direto no navegador.
- **Suporte a múltiplos LLMs** com arquitetura extensível para integrar novos modelos.
- **Anexe imagens aos prompts** para melhor contexto.
- **Terminal integrado** para ver a saída dos comandos LLM.
- **Reverta código para versões anteriores** para depuração fácil e mudanças rápidas.
- **Baixe projetos como ZIP** para portabilidade e sincronize com uma pasta local.
- **Suporte a Docker** para configuração sem complicação.
- **Deploy** direto para **Netlify**

## Configuração

Se você é novo em instalar softwares do GitHub, não se preocupe! Se encontrar problemas, abra uma "issue" pelos links ou melhore esta documentação fazendo um fork, editando e enviando um pull request. As instruções abaixo vão te ajudar a rodar a branch estável localmente rapidinho.

Vamos colocar o Bolt.DIY para rodar na sua máquina!

## Download Rápido

[![Baixar Última Versão](https://img.shields.io/github/v/release/stackblitz-labs/bolt.diy?label=Download%20Bolt&sort=semver)](https://github.com/stackblitz-labs/bolt.diy/releases/latest) ← Clique aqui para baixar a versão mais recente!

- Depois, **clique em source.zip**

## Pré-requisitos

Antes de começar, você precisa instalar dois softwares importantes:

### Instale o Node.js

Node.js é necessário para rodar a aplicação.

1. Acesse a [Página de Download do Node.js](https://nodejs.org/en/download/)
2. Baixe a versão "LTS" (Long Term Support) para seu sistema operacional
3. Rode o instalador, aceitando as configurações padrão
4. Verifique se o Node.js foi instalado corretamente:
   - **No Windows**:
     1. Pressione `Windows + R`
     2. Digite "sysdm.cpl" e pressione Enter
     3. Vá na aba "Avançado" → "Variáveis de Ambiente"
     4. Veja se `Node.js` aparece na variável "Path"
   - **No Mac/Linux**:
     1. Abra o Terminal
     2. Digite:
        ```bash
        echo $PATH
        ```
     3. Procure por `/usr/local/bin` no resultado

## Rodando a Aplicação

Você pode rodar o Bolt.DIY de duas formas: direto na sua máquina ou usando Docker.

### Opção 1: Instalação Direta (Recomendado para Iniciantes)

1. **Instale o Gerenciador de Pacotes (pnpm)**:

   ```bash
   npm install -g pnpm
   ```

2. **Instale as Dependências do Projeto**:

   ```bash
   pnpm install
   ```

3. **Inicie a Aplicação**:

   ```bash
   pnpm run dev
   ```
   
### Opção 2: Usando Docker

Essa opção exige algum conhecimento de Docker, mas oferece um ambiente mais isolado.

#### Pré-requisito Adicional

- Instale o Docker: [Baixar Docker](https://www.docker.com/)

#### Passos:

1. **Construa a Imagem Docker**:

   ```bash
   # Usando npm script:
   npm run dockerbuild

   # OU usando comando Docker direto:
   docker build . --target bolt-ai-development
   ```

2. **Rode o Container**:
   ```bash
   docker compose --profile development up
   ```

## Configurando Chaves de API e Provedores

### Adicionando Suas Chaves de API

Configurar suas chaves de API no Bolt.DIY é simples:

1. Abra a página inicial (interface principal)
2. Selecione o provedor desejado no menu suspenso
3. Clique no ícone de lápis (editar)
4. Insira sua chave de API no campo seguro

![Interface de Configuração de Chave de API](./docs/images/api-key-ui-section.png)

### Configurando URLs Base Personalizadas

Para provedores que suportam URLs base personalizadas (como Ollama ou LM Studio), siga estes passos:

1. Clique no ícone de configurações na barra lateral para abrir o menu
   ![Localização do Botão de Configurações](./docs/images/bolt-settings-button.png)

2. Vá até a aba "Provedores"
3. Busque seu provedor usando a barra de pesquisa
4. Insira sua URL base personalizada no campo indicado
   ![Configuração de URL Base do Provedor](./docs/images/provider-base-url.png)

> **Nota**: URLs base personalizadas são úteis ao rodar instâncias locais de modelos de IA ou usar endpoints de API próprios.

### Provedores Suportados

- Ollama
- LM Studio
- OpenAILike

## Configuração via Git (Apenas para Desenvolvedores)

Este método é recomendado para quem quer:

- Contribuir com o projeto
- Ficar por dentro das últimas mudanças
- Alternar entre versões
- Criar modificações personalizadas

#### Pré-requisitos

1. Instale o Git: [Baixar Git](https://git-scm.com/downloads)

#### Configuração Inicial

1. **Clone o Repositório**:

   ```bash
   git clone -b stable https://github.com/stackblitz-labs/bolt.diy.git
   ```

2. **Acesse o Diretório do Projeto**:

   ```bash
   cd bolt.diy
   ```

3. **Instale Dependências**:

   ```bash
   pnpm install
   ```

4. **Inicie o Servidor de Desenvolvimento**:
   ```bash
   pnpm run dev
   ```

5. **(OPCIONAL)** Alternar para a Branch Principal se você quiser usar pre-release/testbranch:
   ```bash
   git checkout main
   pnpm install
   pnpm run dev
   ```
  Dica: Tenha cuidado com isso, pois pode ter recursos beta e mais bugs do que a versão estável

>**Abra a WebUI para testar (Padrão: http://localhost:5173)**
>   - Iniciantes: 
>     - Tente usar um provedor/modelo sofisticado como Anthropic com Claude Sonnet 3.x Models para obter melhores resultados
>     - Explicação: O Prompt do Sistema atualmente implementado no bolt.diy não pode cobrir o melhor desempenho para todos os provedores e modelos lá fora. Então, funciona melhor com alguns modelos, depois outros, mesmo que os modelos em si sejam perfeitos para >programação
>     - Futuro: Planejado é um Plugin/Extensões-Library para que haja diferentes Prompts do Sistema para diferentes Modelos, o que ajudará a obter melhores resultados

#### Mantendo-se Atualizado

Para obter as últimas mudanças do repositório:

1. **Salve suas Mudanças Locais** (se houver):

   ```bash
   git stash
   ```

2. **Puxe as Últimas Atualizações**:

   ```bash
   git pull 
   ```

3. **Atualize Dependências**:

   ```bash
   pnpm install
   ```

4. **Restaure suas Mudanças Locais** (se houver):
   ```bash
   git stash pop
   ```

#### Resolvendo Problemas com Configuração Git

Se você encontrar problemas:

1. **Instalação Limpa**:

   ```bash
   # Remover módulos do node e arquivos de bloqueio
   rm -rf node_modules pnpm-lock.yaml

   # Limpar cache pnpm
   pnpm store prune

   # Reinstalar dependências
   pnpm install
   ```

2. **Resetar Mudanças Locais**:
   ```bash
   # Descartar todas as mudanças locais
   git reset --hard origin/main
   ```

Lembre-se de sempre commitar suas mudanças locais ou stashá-las antes de puxar atualizações para evitar conflitos.

---

## Scripts Disponíveis

- **`pnpm run dev`**: Inicia o servidor de desenvolvimento.
- **`pnpm run build`**: Constroi o projeto.
- **`pnpm run start`**: Roda o aplicativo construído localmente usando Wrangler Pages.
- **`pnpm run preview`**: Constroi e roda o build de produção localmente.
- **`pnpm test`**: Roda o conjunto de testes usando Vitest.
- **`pnpm run typecheck`**: Roda verificação de tipo TypeScript.
- **`pnpm run typegen`**: Gera tipos TypeScript usando Wrangler.
- **`pnpm run deploy`**: Implanta o projeto para Cloudflare Pages.
- **`pnpm run lint:fix`**: Corrige automaticamente problemas de linting.

---

## Contribuindo

Nós damos boas-vindas! Confira nosso [Guia de Contribuição](CONTRIBUTING.md) para começar.

---

## Roadmap

Explore recursos futuros e prioridades no nosso [Roadmap](https://roadmap.sh/r/ottodev-roadmap-2ovzo).

---

## FAQ

Para respostas para perguntas comuns, problemas e para ver uma lista de modelos recomendados, visite nosso [FAQ Page](FAQ.md).


# Licenciamento
**Quem precisa de uma licença comercial de API de Container Web?**

O código-fonte do bolt.diy é distribuído como MIT, mas usa API de Containers Web que [exige licenciamento](https://webcontainers.io/enterprise) para uso em produção em um negócio, para lucro. (Prototipos ou POCs não precisam de uma licença comercial.) Se você está usando a API para atender às necessidades de seus clientes, possíveis clientes e/ou funcionários, você precisa de uma licença para garantir cumprimento com nosso Termos de Serviço. Uso da API em violação desses termos pode resultar em sua acesso sendo revogado.
