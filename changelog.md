# 🚀 Lançamento v0.0.7

## O que Mudou 🌟

### 🔄 Mudanças desde v0.0.6

### ✨ Funcionalidades

* adicionado suporte para conteúdo de raciocínio ([#1168](https://github.com/stackblitz-labs/bolt.diy/pull/1168)) por @thecodacus
* adicionado deepseek-r1-distill-llama-70b ao provedor groq ([#1187](https://github.com/stackblitz-labs/bolt.diy/pull/1187)) por @saif78642
* adicionado modelo Gemini 2.0 Flash-thinking-exp-01-21 com suporte a 65k tokens ([#1202](https://github.com/stackblitz-labs/bolt.diy/pull/1202)) por @saif78642
* adicionados mais modelos dinâmicos, ordenados e removidos modelos duplicados ([#1206](https://github.com/stackblitz-labs/bolt.diy/pull/1206)) por @thecodacus
* suporte para tags <think></think> para permitir tokens de raciocínio formatados na UI ([#1205](https://github.com/stackblitz-labs/bolt.diy/pull/1205)) por @thecodacus
* recursos aprimorados de Contexto de Código e Resumo do Projeto ([#1191](https://github.com/stackblitz-labs/bolt.diy/pull/1191)) por @thecodacus
* adicionado suporte a modelos dinâmicos para o provedor openAI ([#1241](https://github.com/stackblitz-labs/bolt.diy/pull/1241)) por @thecodacus
* nova interface de configurações do bolt dyi V3 ([#1245](https://github.com/stackblitz-labs/bolt.diy/pull/1245)) por @Stijnus
* implementada busca de modelos llm ([#1322](https://github.com/stackblitz-labs/bolt.diy/pull/1322)) por @kamilfurtak
* visualização de diferenças v2-sem conflitos ([#1335](https://github.com/stackblitz-labs/bolt.diy/pull/1335)) por @Toddyclipsgg
* implantação com um clique no netlify ([#1376](https://github.com/stackblitz-labs/bolt.diy/pull/1376)) por @xKevIsDev
* visualização de diferenças v3 ([#1367](https://github.com/stackblitz-labs/bolt.diy/pull/1367)) por @Toddyclipsgg
* adicionados modelos dinâmicos da anthropic ([#1374](https://github.com/stackblitz-labs/bolt.diy/pull/1374)) por @thecodacus
* tornar as alterações feitas pelo usuário persistentes após recarregar ([#1387](https://github.com/stackblitz-labs/bolt.diy/pull/1387)) por @thecodacus


### 🐛 Correções de Bugs

* correção de variável de ambiente do docker prod ([#1170](https://github.com/stackblitz-labs/bolt.diy/pull/1170)) por @thecodacus
* melhorada a opção de enviar para o github ([#1111](https://github.com/stackblitz-labs/bolt.diy/pull/1111)) por @thecodacus
* problema de importação git ao importar bolt no bolt ([#1020](https://github.com/stackblitz-labs/bolt.diy/pull/1020)) por @thecodacus
* problema com mensagem alternativa ao importar de pasta e git ([#1216](https://github.com/stackblitz-labs/bolt.diy/pull/1216)) por @thecodacus
* ajustado o prompt do sistema para evitar escrita de diferenças ([#1218](https://github.com/stackblitz-labs/bolt.diy/pull/1218)) por @thecodacus
* removida nota do chrome canary (6a8449e) por @leex279
* correção dos ícones do template inicial e redimensionamento automático de ícones personalizados revertido ([#1298](https://github.com/stackblitz-labs/bolt.diy/pull/1298)) por @thecodacus
* correção de rolagem automática, permite que o usuário role para cima durante a resposta da IA ([#1299](https://github.com/stackblitz-labs/bolt.diy/pull/1299)) por @thecodacus
* correção de bug Nova UI / Aba de Recursos - Valores padrão codificados (294adfd) por @leex279
* debounce nas notificações de atualização de perfil para evitar spam de toast (70b723d) por @xKevIsDev
* correção de bug na UI do bolt dyi ([#1342](https://github.com/stackblitz-labs/bolt.diy/pull/1342)) por @Stijnus
* preservar configurações completas do provedor em cookies (220e2da) por @xKevIsDev
* para remover ícone de configurações _index.tsx ([#1356](https://github.com/stackblitz-labs/bolt.diy/pull/1356)) por @Stijnus
* corrigido aprimoramento de prompt para parar de implementar projeto completo em vez de aprimorar ([#1383](https://github.com/stackblitz-labs/bolt.diy/pull/1383)) por @thecodacus


### ⚙️ CI

* atualizado Dockerfile para instalar a versão mais recente do corepack para garantir a versão correta do pnpm (c88938c) por @BaptisteCDC


### 🔍 Outras Mudanças

* novo modelo antropogênico para amazon bedrock (0fd039b) por @leex279
* Isso reverte o commit 871aefbe83c31660b32b53b63772ebba33ed7954, revertendo ([#1335](https://github.com/stackblitz-labs/bolt.diy/pull/1335)) por @Toddyclipsgg
* Atualização do docker.yaml (implantação stable/main) (f0ea22e) por @leex279
* Atualização do Dockerfile - Correção de Bug do Pipeline Docker (8e790d0) por @leex279
* Atualização do Dockerfile (5297081) por @leex279
* Atualização do docker.yaml (7dda793) por @leex279
* Atualização do docker.yaml (67c4051) por @leex279
* Correção de clone git de projeto astro quebrado ([#1352](https://github.com/stackblitz-labs/bolt.diy/pull/1352)) por @Phr33d0m


## ✨ Contribuidores pela Primeira Vez

Um enorme agradecimento aos nossos incríveis novos contribuidores! Sua primeira contribuição marca o início de uma jornada emocionante! 🌟

* 🌟 [@BaptisteCDC](https://github.com/BaptisteCDC)
* 🌟 [@Phr33d0m](https://github.com/Phr33d0m)
* 🌟 [@kamilfurtak](https://github.com/kamilfurtak)
* 🌟 [@saif78642](https://github.com/saif78642)
* 🌟 [@xKevIsDev](https://github.com/xKevIsDev)

## 📈 Estatísticas

**Changelog Completo**: [`v0.0.6..v0.0.7`](https://github.com/stackblitz-labs/bolt.diy/compare/v0.0.6...v0.0.7)
