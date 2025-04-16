const { execSync } = require('child_process');

// Obtém hash do git com fallback
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'no-git-info';
  }
};

let commitJson = {
  hash: JSON.stringify(getGitHash()),
  version: JSON.stringify(process.env.npm_package_version),
};

console.log(`
★═══════════════════════════════════════★
          B O L T . D I Y
         ⚡️  Bem-vindo  ⚡️
★═══════════════════════════════════════★
`);
console.log('📍 Versão:', `v${commitJson.version}`);
console.log('📍 Commit:', commitJson.hash);
console.log('★═══════════════════════════════════════★');
