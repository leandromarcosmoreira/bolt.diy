#!/bin/bash

# Sai em caso de erro
set -e

echo "Iniciando processo de atualização do Bolt.DIY..."

# Obtém o diretório atual
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Armazena versão atual
CURRENT_VERSION=$(cat "$PROJECT_ROOT/package.json" | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

echo "Versão atual: $CURRENT_VERSION"
echo "Buscando última versão..."

# Cria diretório temporário
TMP_DIR=$(mktemp -d)
cd "$TMP_DIR"

# Baixa última versão
LATEST_RELEASE_URL=$(curl -s https://api.github.com/repos/leandromarcosmoreira/bolt.diy/releases/latest | grep "browser_download_url.*zip" | cut -d : -f 2,3 | tr -d \")
if [ -z "$LATEST_RELEASE_URL" ]; then
    echo "Erro: Não foi possível encontrar URL de download da última versão"
    exit 1
fi

echo "Baixando última versão..."
curl -L -o latest.zip "$LATEST_RELEASE_URL"

echo "Extraindo atualização..."
unzip -q latest.zip

# Faz backup da instalação atual
echo "Criando backup..."
BACKUP_DIR="$PROJECT_ROOT/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$PROJECT_ROOT"/* "$BACKUP_DIR/"

# Instala atualização
echo "Instalando atualização..."
cp -r ./* "$PROJECT_ROOT/"

# Limpa
cd "$PROJECT_ROOT"
rm -rf "$TMP_DIR"

echo "Atualização concluída com sucesso!"
echo "Por favor, reinicie a aplicação para aplicar as mudanças."

exit 0
