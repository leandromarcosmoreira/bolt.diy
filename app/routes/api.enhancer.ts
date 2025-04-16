import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { streamText } from '~/lib/.server/llm/stream-text';
import { stripIndents } from '~/utils/stripIndent';
import type { ProviderInfo } from '~/types/model';
import { getApiKeysFromCookie, getProviderSettingsFromCookie } from '~/lib/api/cookies';
import { createScopedLogger } from '~/utils/logger';

export async function action(args: ActionFunctionArgs) {
  return enhancerAction(args);
}

const logger = createScopedLogger('api.enhancher');

async function enhancerAction({ context, request }: ActionFunctionArgs) {
  const { message, model, provider } = await request.json<{
    message: string;
    model: string;
    provider: ProviderInfo;
    apiKeys?: Record<string, string>;
  }>();

  const { name: providerName } = provider;

  // validate 'model' and 'provider' fields
  if (!model || typeof model !== 'string') {
    throw new Response('Modelo inválido ou ausente', {
      status: 400,
      statusText: 'Solicitação inválida',
    });
  }

  if (!providerName || typeof providerName !== 'string') {
    throw new Response('Provedor inválido ou ausente', {
      status: 400,
      statusText: 'Solicitação inválida',
    });
  }

  const cookieHeader = request.headers.get('Cookie');
  const apiKeys = getApiKeysFromCookie(cookieHeader);
  const providerSettings = getProviderSettingsFromCookie(cookieHeader);

  try {
    const result = await streamText({
      messages: [
        {
          role: 'user',
          content:
            `[Model: ${model}]\n\n[Provider: ${providerName}]\n\n` +
            stripIndents`
            Você é um engenheiro de prompt profissional especializado em criar prompts precisos e eficazes.
            Seu objetivo é aprimorar prompts fazendo-os mais específicos, ações e eficazes.

            Quero que você melhore o prompt do usuário que está entre \`<original_prompt>\` tags.

            Para prompts válidos:
            - Faça instruções explícitas e inequívocas
            - Adicione contexto e restrições relevantes
            - Remova informações redundantes
            - Mantenha o núcleo do propósito
            - Garanta que o prompt seja auto-contido
            - Use linguagem profissional

            Para prompts inválidos ou pouco claros:
            - Responda com orientações claras e profissionais
            - Mantenha respostas concisas e ações
            - Mantenha um tom de ajuda e construção
            - Enfoco no que o usuário deve fornecer
            - Use um template padrão para consistência

            IMPORTANTE: Sua resposta deve conter apenas o prompt aprimorado.
            Não inclua explicações, metadados ou tags de wrapper.

            <original_prompt>
              ${message}
            </original_prompt>
          `,
        },
      ],
      env: context.cloudflare?.env as any,
      apiKeys,
      providerSettings,
      options: {
        system:
          'Você é um arquiteto de software sênior, você deve ajudar o usuário a analisar a consulta do usuário e enriquecê-la com o contexto e restrições necessárias para torná-la mais específica, eficaz e eficaz. Você também deve garantir que o prompt seja auto-contido e use linguagem profissional. Sua resposta deve conter apenas o prompt aprimorado. Não inclua explicações, metadados ou tags de wrapper.',

        /*
         * onError: (event) => {
         *   throw new Response(null, {
         *     status: 500,
         *     statusText: 'Internal Server Error',
         *   });
         * }
         */
      },
    });

    // Handle streaming errors in a non-blocking way
    (async () => {
      try {
        for await (const part of result.fullStream) {
          if (part.type === 'error') {
            const error: any = part.error;
            logger.error('Streaming error:', error);
            break;
          }
        }
      } catch (error) {
        logger.error('Error processing stream:', error);
      }
    })();

    // Return the text stream directly since it's already text data
    return new Response(result.textStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error && error.message?.includes('API key')) {
      throw new Response('Invalid or missing API key', {
        status: 401,
        statusText: 'Unauthorized',
      });
    }

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
