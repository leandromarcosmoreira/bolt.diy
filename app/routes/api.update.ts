import { json, type ActionFunction } from '@remix-run/cloudflare';

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Método não permitido' }, { status: 405 });
  }

  return json(
    {
      error: 'As atualizações devem ser realizadas manualmente em um ambiente de servidor',
      instructions: [
        '1. Navegue até o diretório do projeto',
        '2. Execute: git fetch upstream',
        '3. Execute: git pull upstream main',
        '4. Execute: pnpm install',
        '5. Execute: pnpm run build',
      ],
    },
    { status: 400 },
  );
};
