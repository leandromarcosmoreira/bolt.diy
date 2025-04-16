#!/bin/bash

# Atualiza importações em arquivos TypeScript
find app -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's|~/components/settings/settings.types|~/components/@settings/core/types|g'

# Atualiza importações para componentes específicos
find app -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's|~/components/settings/|~/components/@settings/tabs/|g' 