import { rm, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirsToRemove = ['node_modules/.vite', 'node_modules/.cache', '.cache', 'dist'];

console.log('🧹 Limpando projeto...');

// Remove diretórios
for (const dir of dirsToRemove) {
  const fullPath = join(__dirname, '..', dir);

  try {
    if (existsSync(fullPath)) {
      console.log(`Removendo ${dir}...`);
      rm(fullPath, { recursive: true, force: true }, (err) => {
        if (err) {
          console.error(`Erro ao remover ${dir}:`, err.message);
        }
      });
    }
  } catch (err) {
    console.error(`Erro ao remover ${dir}:`, err.message);
  }
}

// Executa comandos pnpm
console.log('\n📦 Reinstalando dependências...');

try {
  execSync('pnpm install', { stdio: 'inherit' });
  console.log('\n🗑️  Limpando cache do pnpm...');
  execSync('pnpm cache clean', { stdio: 'inherit' });
  console.log('\n🏗️  Reconstruindo projeto...');
  execSync('pnpm build', { stdio: 'inherit' });
  console.log('\n✨ Limpeza concluída! Agora você pode executar pnpm dev');
} catch (err) {
  console.error('\n❌ Erro durante a limpeza:', err.message);
  process.exit(1);
}
