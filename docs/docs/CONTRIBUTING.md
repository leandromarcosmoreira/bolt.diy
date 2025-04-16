# Guia de Contribuição

Bem-vindo ao guia de contribuição do bolt.diy! Este documento fornece informações sobre como você pode contribuir para o projeto.

## Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Diretrizes para Pull Requests](#diretrizes-para-pull-requests)
- [Padrões de Código](#padrões-de-código)
- [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
- [Testes](#testes)
- [Implantação](#implantação)
- [Implantação com Docker](#implantação-com-docker)
- [Integração com VS Code Dev Containers](#integração-com-vs-code-dev-containers)

## Código de Conduta

Ao contribuir para este projeto, você concorda em seguir nosso [Código de Conduta](CODE_OF_CONDUCT.md).

## Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Diretrizes para Pull Requests

- Mantenha os PRs pequenos e focados
- Inclua testes para novas funcionalidades
- Atualize a documentação conforme necessário
- Siga os padrões de código estabelecidos
- Adicione uma descrição clara das mudanças

## Padrões de Código

- Use TypeScript para todo o código novo
- Siga o estilo de código existente
- Mantenha o código limpo e bem documentado
- Use nomes descritivos para variáveis e funções
- Escreva testes para novas funcionalidades

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:
   ```bash
   git clone https://github.com/stackblitz-labs/bolt.diy.git
   cd bolt.diy
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   - Copie `.env.example` para `.env.local`
   - Preencha as variáveis necessárias

4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```

## Testes

Execute os testes com:
```bash
pnpm test
```

## Implantação

Para implantar suas mudanças:

1. Certifique-se de que todos os testes passam
2. Atualize a versão no `package.json`
3. Execute o script de implantação:
   ```bash
   pnpm run deploy
   ```

## Implantação com Docker

1. Construa a imagem:
   ```bash
   docker build -t bolt-diy .
   ```

2. Execute o container:
   ```bash
   docker run -p 3000:3000 bolt-diy
   ```

## Integração com VS Code Dev Containers

1. Instale a extensão "Remote - Containers" no VS Code
2. Abra o projeto no VS Code
3. Clique em "Reopen in Container" quando solicitado

O ambiente de desenvolvimento será configurado automaticamente dentro do container.
