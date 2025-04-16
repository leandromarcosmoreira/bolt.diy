# Perguntas Frequentes (FAQ)

<details>
<summary><strong>Quais são os melhores modelos para o bolt.diy?</strong></summary>

Para a melhor experiência com o bolt.diy, recomendamos os seguintes modelos:

- **Claude 3.5 Sonnet (antigo)**: Melhor codificador geral, com ótimos resultados em todos os casos de uso
- **Gemini 2.0 Flash**: Velocidade excepcional mantendo boa performance
- **GPT-4o**: Forte alternativa ao Claude 3.5 Sonnet, com capacidades similares
- **DeepSeekCoder V2 236b**: Melhor modelo open source (disponível via OpenRouter, API DeepSeek ou self-hosted)
- **Qwen 2.5 Coder 32b**: Melhor modelo para rodar localmente com hardware razoável

**Nota**: Modelos com menos de 7b parâmetros geralmente não conseguem interagir corretamente com o bolt!

</details>

<details>
<summary><strong>Como obter os melhores resultados com o bolt.diy?</strong></summary>

- **Seja específico sobre sua stack**:  
  Mencione os frameworks ou bibliotecas que deseja usar (ex: Astro, Tailwind, ShadCN) no seu prompt inicial. Assim, o bolt.diy monta o projeto conforme suas preferências.

- **Use o ícone de aprimorar prompt**:  
  Antes de enviar seu prompt, clique no ícone _aprimorar_ para a IA refinar seu texto. Você pode editar as sugestões antes de enviar.

- **Monte o básico primeiro, depois adicione recursos**:  
  Garanta que a estrutura principal do app esteja pronta antes de adicionar funcionalidades avançadas. Isso ajuda o bolt.diy a criar uma base sólida.

- **Agrupe instruções simples**:  
  Junte tarefas simples em um único prompt para economizar tempo e créditos de API. Exemplo:  
  _"Mude o esquema de cores, adicione responsividade e reinicie o servidor de desenvolvimento."_
</details>

<details>
<summary><strong>Como contribuir com o bolt.diy?</strong></summary>

Veja nosso [Guia de Contribuição](CONTRIBUTING.md) para saber como participar!

</details>

<details>
<summary><strong>Quais os planos futuros para o bolt.diy?</strong></summary>

Confira nosso [Roadmap](https://roadmap.sh/r/ottodev-roadmap-2ovzo) para as últimas novidades.  
Novos recursos e melhorias estão a caminho!

</details>

<details>
<summary><strong>Por que há tantas issues/pull requests abertos?</strong></summary>

O bolt.diy começou como um projeto pequeno no canal do @ColeMedin no YouTube para explorar edição de projetos open-source com LLMs locais. Mas rapidamente virou um grande esforço da comunidade!

Estamos formando um time de mantenedores para gerenciar a demanda e agilizar as soluções. Os mantenedores são incríveis, e também buscamos parcerias para o projeto crescer.

</details>

<details>
<summary><strong>Como os LLMs locais se comparam a modelos maiores como Claude 3.5 Sonnet no bolt.diy?</strong></summary>

Embora os LLMs locais estejam evoluindo rápido, modelos maiores como GPT-4o, Claude 3.5 Sonnet e DeepSeek Coder V2 236b ainda entregam os melhores resultados para apps complexos. Nosso foco é melhorar prompts, agentes e a plataforma para dar mais suporte aos LLMs locais menores.

</details>

<details>
<summary><strong>Erros comuns e soluções</strong></summary>

### **"There was an error processing this request"**

Esse erro genérico indica que algo deu errado. Verifique:

- O terminal (se iniciou o app com Docker ou `pnpm`).
- O console do navegador (aperte `F12` ou clique com o direito > _Inspecionar_, depois vá na aba _Console_).

### **"x-api-key header missing"**

Às vezes, reiniciar o container Docker resolve.  
Se não funcionar, tente alternar entre Docker e `pnpm`. Estamos investigando esse problema.

### **Preview em branco ao rodar o app**

Geralmente ocorre por código ruim ou comandos incorretos gerados pela IA.  
Para resolver:

- Veja o console do navegador para erros.
- Previews são parte central do app, então não significa que está quebrado! Estamos tornando esses erros mais claros.

### **"Tudo funciona, mas os resultados são ruins"**

LLMs locais como Qwen-2.5-Coder são ótimos para apps pequenos, mas ainda experimentais para projetos grandes. Para melhores resultados, use modelos maiores como GPT-4o, Claude 3.5 Sonnet ou DeepSeek Coder V2 236b.

### **"Received structured exception #0xc0000005: access violation"**

Se você está vendo isso, provavelmente está no Windows. A solução é atualizar o [Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)

### **"Miniflare ou erros do Wrangler no Windows"**

Você precisa garantir que tem a versão mais recente do Visual Studio C++ instalada (14.40.33816), mais informações aqui https://github.com/stackblitz-labs/bolt.diy/issues/19.

</details>

---

Ficou com dúvidas? Fique à vontade para perguntar ou abrir uma issue no nosso repositório do GitHub!
