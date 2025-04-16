import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare';

export const loader = async ({ request: _request }: LoaderFunctionArgs) => {
  return json({
    status: 'saudável',
    timestamp: new Date().toISOString(),
  });
};
