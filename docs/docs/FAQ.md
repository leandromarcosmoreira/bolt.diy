# Perguntas Frequentes (FAQ)

## Modelos e Configuração

??? question "Quais são os melhores modelos para o bolt.diy?"
Para a melhor experiência com o bolt.diy, recomendamos usar os seguintes modelos:

    - **Claude 3.5 Sonnet (antigo)**: Melhor codificador geral, fornecendo excelentes resultados em todos os casos de uso
    - **Gemini 2.0 Flash**: Velocidade excepcional mantendo bom desempenho
    - **GPT-4o**: Forte alternativa ao Claude 3.5 Sonnet com capacidades comparáveis
    - **DeepSeekCoder V3**: Melhor modelo de código aberto (disponível através do OpenRouter, API DeepSeek ou auto-hospedado)
    - **DeepSeekCoder V2 236b**: disponível através do OpenRouter, API DeepSeek ou auto-hospedado
    - **Qwen 2.5 Coder 32b**: Melhor modelo para auto-hospedagem com requisitos de hardware razoáveis

    !!! warning
        Modelos com menos de 7b parâmetros geralmente não têm a capacidade de interagir adequadamente com o bolt!

## Melhores Práticas

??? question "Como obter os melhores resultados com o bolt.diy?" - **Seja específico sobre sua stack**:  
 Mencione os frameworks ou bibliotecas que você deseja usar (ex: Astro, Tailwind, ShadCN) em seu prompt inicial. Isso garante que o bolt.diy estruture o projeto de acordo com suas preferências.

    - **Use o ícone de aprimoramento de prompt**:
      Antes de enviar seu prompt, clique no ícone *aprimorar* para permitir que a IA refine seu prompt. Você pode editar as melhorias sugeridas antes de enviar.

    - **Estruture o básico primeiro, depois adicione recursos**:
      Certifique-se de que a estrutura fundamental de sua aplicação esteja em vigor antes de introduzir funcionalidades avançadas. Isso ajuda o bolt.diy a estabelecer uma base sólida para construir.

    - **Agrupe instruções simples**:
      Combine tarefas simples em um único prompt para economizar tempo e reduzir o consumo de créditos de API. Por exemplo:
      *"Altere o esquema de cores, adicione responsividade móvel e reinicie o servidor de desenvolvimento."*

## Informações do Projeto

??? question "Como posso contribuir para o bolt.diy?"
Confira nosso [Guia de Contribuição](CONTRIBUTING.md) para mais detalhes sobre como se envolver!

??? question "Quais são os planos futuros para o bolt.diy?"
Visite nosso [Roteiro](https://roadmap.sh/r/ottodev-roadmap-2ovzo) para as atualizações mais recentes.  
 Novos recursos e melhorias estão a caminho!

??? question "Por que existem tantos problemas/pull requests abertos?"
O bolt.diy começou como um pequeno projeto de demonstração no canal YouTube de @ColeMedin para explorar a edição de projetos de código aberto com LLMs locais. No entanto, rapidamente se transformou em um enorme esforço comunitário!

    Estamos formando uma equipe de mantenedores para gerenciar a demanda e agilizar a resolução de problemas. Os mantenedores são estrelas, e também estamos explorando parcerias para ajudar o projeto a prosperar.

## Comparações de Modelos

??? question "Como os LLMs locais se comparam a modelos maiores como o Claude 3.5 Sonnet para o bolt.diy?"
Embora os LLMs locais estejam melhorando rapidamente, modelos maiores como GPT-4o, Claude 3.5 Sonnet e DeepSeek Coder V2 236b ainda oferecem os melhores resultados para aplicações complexas. Nosso foco contínuo é melhorar os prompts, agentes e a plataforma para melhor suportar LLMs locais menores.

## Solução de Problemas

??? error "Houve um erro ao processar esta solicitação"
Esta mensagem de erro genérica significa que algo deu errado. Verifique ambos:

    - O terminal (se você iniciou o aplicativo com Docker ou `pnpm`).

    - O console do desenvolvedor em seu navegador (pressione `F12` ou clique com o botão direito > *Inspecionar*, depois vá para a aba *Console*).

??? error "cabeçalho x-api-key ausente"
Este erro às vezes é resolvido reiniciando o contêiner Docker.  
 Se isso não funcionar, tente alternar do Docker para `pnpm` ou vice-versa. Estamos investigando ativamente este problema.

??? error "Visualização em branco ao executar o aplicativo"
Uma visualização em branco geralmente ocorre devido a código alucinado incorreto ou comandos incorretos.  
 Para solucionar problemas:

    - Verifique o console do desenvolvedor para erros.

    - Lembre-se, as visualizações são funcionalidades principais, então o aplicativo não está quebrado! Estamos trabalhando para tornar esses erros mais transparentes.

??? error "Tudo funciona, mas os resultados são ruins"
LLMs locais como o Qwen-2.5-Coder são poderosos para aplicações pequenas, mas ainda são experimentais para projetos maiores. Para melhores resultados, considere usar modelos maiores como

    - GPT-4o
    - Claude 3.5 Sonnet
    - DeepSeek Coder V2 236b

??? error "Recebida exceção estruturada #0xc0000005: violação de acesso"
Se você está recebendo isso, provavelmente está no Windows. A correção geralmente é atualizar o [Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)

??? error "Erros de Miniflare ou Wrangler no Windows"
Você precisará ter certeza de que tem a versão mais recente do Visual Studio C++ instalada (14.40.33816), mais informações aqui <a href="https://github.com/stackblitz-labs/bolt.diy/issues/19">Github Issues</a>

---

## Obtenha Ajuda e Suporte

!!! tip "Suporte Comunitário"
[Junte-se à Comunidade bolt.diy](https://thinktank.ottomator.ai/c/bolt-diy/17){target=\_blank} para discussões e ajuda

!!! bug "Reportar Problemas"
[Abra um Problema](https://github.com/stackblitz-labs/bolt.diy/issues/19){target=\_blank} em nosso Repositório GitHub
