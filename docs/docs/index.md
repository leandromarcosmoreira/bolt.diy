# Bem-vindo ao bolt.diy

Bolt.diy é uma plataforma de desenvolvimento que permite criar, editar e executar aplicações web diretamente no navegador. Com suporte para modelos de linguagem locais e em nuvem, o bolt.diy oferece uma experiência de desenvolvimento flexível e poderosa.

## Recursos Principais

- **Desenvolvimento no Navegador**: Crie e edite aplicações web sem necessidade de instalação local
- **Suporte para LLMs**: Integração com modelos de linguagem locais e em nuvem
- **Ambiente de Desenvolvimento Completo**: Editor de código, terminal e visualização em tempo real
- **Personalização**: Adapte o ambiente de desenvolvimento às suas necessidades

## Começando

Para começar a usar o bolt.diy, siga estas etapas:

1. Clone o repositório
2. Instale as dependências
3. Configure as variáveis de ambiente
4. Inicie o servidor de desenvolvimento

Consulte nossa [documentação de instalação](installation.md) para instruções detalhadas.

## Contribuindo

Agradecemos contribuições da comunidade! Se você gostaria de contribuir, por favor:

1. Leia nosso [guia de contribuição](CONTRIBUTING.md)
2. Verifique os [problemas abertos](https://github.com/stackblitz-labs/bolt.diy/issues)
3. Envie um pull request

## Suporte

Se você encontrar problemas ou tiver dúvidas:

- Consulte nossa [FAQ](FAQ.md)
- Abra um [problema](https://github.com/stackblitz-labs/bolt.diy/issues)
- Junte-se à nossa [comunidade](https://thinktank.ottomator.ai/c/bolt-diy/17)

## Licença

O bolt.diy é licenciado sob a [Licença MIT](LICENSE).

## Table of Contents

- [Join the community!](#join-the-community)
- [Features](#features)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Entering API Keys](#entering-api-keys)
    - [1. Set API Keys in the `.env.local` File](#1-set-api-keys-in-the-envlocal-file)
    - [2. Configure API Keys Directly in the Application](#2-configure-api-keys-directly-in-the-application)
- [Run the Application](#run-the-application)
  - [Option 1: Without Docker](#option-1-without-docker)
  - [Option 2: With Docker](#option-2-with-docker)
- [Update Your Local Version to the Latest](#update-your-local-version-to-the-latest)
- [Adding New LLMs](#adding-new-llms)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Tips and Tricks](#tips-and-tricks)

---

## Join the community!

[Join the community!](https://thinktank.ottomator.ai)

Also [this pinned post in our community](https://thinktank.ottomator.ai/t/videos-tutorial-helpful-content/3243) has a bunch of incredible resources for running and deploying bolt.diy yourself!

---

## Features

- **AI-powered full-stack web development** directly in your browser.
- **Support for multiple LLMs** with an extensible architecture to integrate additional models.
- **Attach images to prompts** for better contextual understanding.
- **Integrated terminal** to view output of LLM-run commands.
- **Revert code to earlier versions** for easier debugging and quicker changes.
- **Download projects as ZIP** for easy portability.
- **Integration-ready Docker support** for a hassle-free setup.

---

## Setup

If you're new to installing software from GitHub, don't worry! If you encounter any issues, feel free to submit an "issue" using the provided links or improve this documentation by forking the repository, editing the instructions, and submitting a pull request. The following instruction will help you get the stable branch up and running on your local machine in no time.

### Prerequisites

1. **Install Git**: [Download Git](https://git-scm.com/downloads)
2. **Install Node.js**: [Download Node.js](https://nodejs.org/en/download/)

   - After installation, the Node.js path is usually added to your system automatically. To verify:
     - **Windows**: Search for "Edit the system environment variables," click "Environment Variables," and check if `Node.js` is in the `Path` variable.
     - **Mac/Linux**: Open a terminal and run:
       ```bash
       echo $PATH
       ```
       Look for `/usr/local/bin` in the output.

### Clone the Repository

Alternatively, you can download the latest version of the project directly from the [Releases Page](https://github.com/stackblitz-labs/bolt.diy/releases/latest). Simply download the .zip file, extract it, and proceed with the setup instructions below. If you are comfertiable using git then run the command below.

Clone the repository using Git:

```bash
git clone -b stable https://github.com/stackblitz-labs/bolt.diy
```

---

### Entering API Keys

There are two ways to configure your API keys in bolt.diy:

#### 1. Set API Keys in the `.env.local` File

When setting up the application, you will need to add your API keys for the LLMs you wish to use. You can do this by renaming the `.env.example` file to `.env.local` and adding your API keys there.

- On **Mac**, you can find the file at `[your name]/bolt.diy/.env.example`.
- On **Windows/Linux**, the path will be similar.

If you can't see the file, it's likely because hidden files are not being shown. On **Mac**, open a Terminal window and enter the following command to show hidden files:

```bash
defaults write com.apple.finder AppleShowAllFiles YES
```

Make sure to add your API keys for each provider you want to use, for example:

```
GROQ_API_KEY=XXX
OPENAI_API_KEY=XXX
ANTHROPIC_API_KEY=XXX
```

Once you've set your keys, you can proceed with running the app. You will set these keys up during the initial setup, and you can revisit and update them later after the app is running.

**Note**: Never commit your `.env.local` file to version control. It's already included in the `.gitignore`.

#### 2. Configure API Keys Directly in the Application

Alternatively, you can configure your API keys directly in the application once it's running. To do this:

1. Launch the application and navigate to the provider selection dropdown.
2. Select the provider you wish to configure.
3. Click the pencil icon next to the selected provider.
4. Enter your API key in the provided field.

This method allows you to easily add or update your keys without needing to modify files directly.

Once you've configured your keys, the application will be ready to use the selected LLMs.

---

## Run the Application

### Option 1: Without Docker

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

   If `pnpm` is not installed, install it using:

   ```bash
   sudo npm install -g pnpm
   ```

2. **Start the Application**:
   ```bash
   pnpm run dev
   ```
   This will start the Remix Vite development server. You will need Google Chrome Canary to run this locally if you use Chrome! It's an easy install and a good browser for web development anyway.

### Option 2: With Docker

#### Prerequisites

- Ensure Git, Node.js, and Docker are installed: [Download Docker](https://www.docker.com/)

#### Steps

1. **Build the Docker Image**:

   Use the provided NPM scripts:

   ```bash
   npm run dockerbuild
   ```

   Alternatively, use Docker commands directly:

   ```bash
   docker build . --target bolt-ai-development
   ```

2. **Run the Container**:  
   Use Docker Compose profiles to manage environments:

   ```bash
   docker compose --profile development up
   ```

   - With the development profile, changes to your code will automatically reflect in the running container (hot reloading).

---

### Update Your Local Version to the Latest

To keep your local version of bolt.diy up to date with the latest changes, follow these steps for your operating system:

#### 1. **Navigate to your project folder**

Navigate to the directory where you cloned the repository and open a terminal:

#### 2. **Fetch the Latest Changes**

Use Git to pull the latest changes from the main repository:

```bash
git pull origin main
```

#### 3. **Update Dependencies**

After pulling the latest changes, update the project dependencies by running the following command:

```bash
pnpm install
```

#### 4. **Rebuild and Start the Application**

- **If using Docker**, ensure you rebuild the Docker image to avoid using a cached version:

  ```bash
  docker compose --profile development up --build
  ```

- **If not using Docker**, you can start the application as usual with:
  ```bash
  pnpm run dev
  ```

This ensures that you're running the latest version of bolt.diy and can take advantage of all the newest features and bug fixes.

---

## Adding New LLMs:

To make new LLMs available to use in this version of bolt.diy, head on over to `app/utils/constants.ts` and find the constant MODEL_LIST. Each element in this array is an object that has the model ID for the name (get this from the provider's API documentation), a label for the frontend model dropdown, and the provider.

By default, Anthropic, OpenAI, Groq, and Ollama are implemented as providers, but the YouTube video for this repo covers how to extend this to work with more providers if you wish!

When you add a new model to the MODEL_LIST array, it will immediately be available to use when you run the app locally or reload it. For Ollama models, make sure you have the model installed already before trying to use it here!

---

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the project.
- `pnpm run start`: Runs the built application locally using Wrangler Pages. This script uses `bindings.sh` to set up necessary bindings so you don't have to duplicate environment variables.
- `pnpm run preview`: Builds the project and then starts it locally, useful for testing the production build. Note, HTTP streaming currently doesn't work as expected with `wrangler pages dev`.
- `