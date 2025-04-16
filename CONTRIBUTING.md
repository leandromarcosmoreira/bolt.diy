# Diretrizes de Contribuição

Bem-vindo! Este guia traz todos os detalhes para você contribuir de forma eficiente com o projeto. Obrigado por ajudar a tornar o **bolt.diy** uma ferramenta melhor para desenvolvedores do mundo todo. 💡

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como posso contribuir?](#como-posso-contribuir)
3. [Diretrizes para Pull Requests](#diretrizes-para-pull-requests)
4. [Padrões de Código](#padrões-de-código)
5. [Configuração de Desenvolvimento](#configuração-de-desenvolvimento)
6. [Testes](#testes)
7. [Deploy](#deploy)
8. [Deploy com Docker](#deploy-com-docker)
9. [Integração com Dev Containers do VS Code](#integração-com-dev-containers-do-vs-code)

---

## 🛡️ Código de Conduta

Este projeto segue nosso **Código de Conduta**. Ao participar, você concorda em respeitar esse código. Comporte-se e reporte qualquer atitude inaceitável aos mantenedores.

---

## 🛠️ Como posso contribuir?

### 1️⃣ Reportando Bugs ou Sugerindo Funcionalidades

- Verifique o [issue tracker](#) para evitar duplicidades.
- Use os templates de issues (se disponíveis).
- Forneça informações detalhadas e passos para reproduzir bugs.

### 2️⃣ Contribuindo com Código

1. Faça um fork do repositório.
2. Crie um branch para sua feature ou correção.
3. Escreva e teste seu código.
4. Envie um pull request (PR).

### 3️⃣ Torne-se um Contribuidor Core

Quer ajudar a manter e expandir o projeto? Preencha nosso [Formulário de Contribuidor](https://forms.gle/TBSteXSDCtBDwr5m7).

---

## ✅ Diretrizes para Pull Requests

### Checklist de PR

- Faça branch a partir da branch **main**.
- Atualize a documentação, se necessário.
- Teste todas as funcionalidades manualmente.
- Foque em uma feature/bug por PR.

### Processo de Revisão

1. Testes manuais pelos revisores.
2. Pelo menos um mantenedor deve revisar.
3. Responda aos comentários da revisão.
4. Mantenha o histórico de commits limpo.

---

## 📏 Padrões de Código

### Diretrizes Gerais

- Siga o estilo de código existente.
- Comente lógicas complexas.
- Mantenha funções pequenas e objetivas.
- Use nomes de variáveis claros.

---

## 🖥️ Configuração de Desenvolvimento

### 1️⃣ Setup Inicial

- Clone o repositório:
  ```bash
  git clone https://github.com/stackblitz-labs/bolt.diy.git
  ```
- Instale as dependências:
  ```bash
  pnpm install
  ```
- Configure as variáveis de ambiente:
  1. Renomeie `.env.example` para `.env.local`.
  2. Adicione suas chaves de API:
     ```bash
     GROQ_API_KEY=XXX
     HuggingFace_API_KEY=XXX
     OPENAI_API_KEY=XXX
     ...
     ```
  3. Opcionalmente defina:
     - Nível de debug: `VITE_LOG_LEVEL=debug`
     - Contexto: `DEFAULT_NUM_CTX=32768`

**Nota**: Nunca faça commit do seu `.env.local`. Ele já está no `.gitignore`.

### 2️⃣ Rodando o Servidor de Desenvolvimento

```bash
pnpm run dev
```

**Dica**: Use o **Google Chrome Canary** para testes locais.

---

## 🧪 Testes

Execute a suíte de testes com:

```bash
pnpm test
```

---

## 🚀 Deploy

### Deploy no Cloudflare Pages

```bash
pnpm run deploy
```

Garanta que você tem as permissões necessárias e o Wrangler configurado.

---

## 🐳 Deploy com Docker

Esta seção mostra como fazer deploy usando Docker. Os processos para **Desenvolvimento** e **Produção** são separados para clareza.

---

### 🧑‍💻 Ambiente de Desenvolvimento

#### Opções de Build

**Opção 1: Scripts Auxiliares**

```bash
# Build de desenvolvimento
npm run dockerbuild
```

**Opção 2: Comando Docker Build Direto**

```bash
docker build . --target bolt-ai-development
```

**Opção 3: Docker Compose Profile**

```bash
docker compose --profile development up
```

#### Rodando o Container de Desenvolvimento

```bash
docker run -p 5173:5173 --env-file .env.local bolt-ai:development
```

---

### 🏭 Ambiente de Produção

#### Opções de Build

**Opção 1: Scripts Auxiliares**

```bash
# Build de produção
npm run dockerbuild:prod
```

**Opção 2: Comando Docker Build Direto**

```bash
docker build . --target bolt-ai-production
```

**Opção 3: Docker Compose Profile**

```bash
docker compose --profile production up
```

#### Rodando o Container de Produção

```bash
docker run -p 5173:5173 --env-file .env.local bolt-ai:production
```

---

### Deploy com Coolify

Para um deploy fácil, use [Coolify](https://github.com/coollabsio/coolify):

1. Importe seu repositório Git no Coolify.
2. Escolha **Docker Compose** como build pack.
3. Configure as variáveis de ambiente (ex: chaves de API).
4. Defina o comando de inicialização:
   ```bash
   docker compose --profile production up
   ```

---

## 🛠️ Integração com Dev Containers do VS Code

O arquivo `docker-compose.yaml` é compatível com **VS Code Dev Containers**, facilitando o setup do ambiente de desenvolvimento direto no Visual Studio Code.

### Como Usar Dev Containers

1. Abra a paleta de comandos no VS Code (`Ctrl+Shift+P` ou `Cmd+Shift+P` no macOS).
2. Selecione **Dev Containers: Reabrir no Container**.
3. Escolha o perfil **development** quando solicitado.
4. O VS Code irá reconstruir o container e abrir o ambiente já configurado.

---

## 🔑 Variáveis de Ambiente

Garanta que o `.env.local` está configurado corretamente com:

- Chaves de API.
- Configurações específicas de contexto.

Exemplo para a variável `DEFAULT_NUM_CTX`:

```bash
DEFAULT_NUM_CTX=24576 # Usa 32GB de VRAM
```
