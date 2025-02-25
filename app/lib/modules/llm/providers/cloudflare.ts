import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo, ProviderConfig } from '~/lib/modules/llm/types';
import type { LanguageModelV1, LanguageModelV1CallOptions } from 'ai';
import type { IProviderSetting } from '~/types/model';

export interface CloudflareProviderConfig extends ProviderConfig {
  apiToken: string;
}

export default class CloudflareProvider extends BaseProvider {
  name = 'Cloudflare';
  getApiKeyLink = 'https://dash.cloudflare.com/profile/api-tokens';

  config: ProviderConfig = {
    baseUrl: 'https://api.cloudflare.com',
    apiTokenKey: 'CLOUDFLARE_API_TOKEN',
  };

  staticModels: ModelInfo[] = [
    {
      name: '@hf/thebloke/deepseek-coder-6.7b-instruct-awq',
      label: 'DeepSeek Coder 6.7B Instruct AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@hf/thebloke/deepseek-coder-6.7b-base-awq',
      label: 'DeepSeek Coder 6.7B Base AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@hf/thebloke/deepseek-coder-6.7b-instruct',
      label: 'DeepSeek Coder 6.7B Instruct',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@hf/thebloke/deepseek-coder-6.7b-base',
      label: 'DeepSeek Coder 6.7B Base',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    { name: '@cf/defog/sqlcoder-7b-2', label: 'SQLCoder 7B', provider: 'Cloudflare', maxTokenAllowed: 2048 },
    {
      name: '@hf/thebloke/mistral-7b-instruct-v0.1-awq',
      label: 'Mistral 7B Instruct AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@hf/thebloke/openhermes-2.5-mistral-7b-awq',
      label: 'OpenHermes 2.5 Mistral 7B AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    { name: '@cf/microsoft/phi-2', label: 'Phi-2 (Microsoft)', provider: 'Cloudflare', maxTokenAllowed: 2048 },
    {
      name: '@cf/thebloke/zephyr-7b-beta-awq',
      label: 'Zephyr 7B Beta AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@cf/thebloke/llama-2-13b-chat-awq',
      label: 'Llama 2 13B Chat AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@cf/meta/llama-3-8b-instruct',
      label: 'Llama 3 8B Instruct',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
    {
      name: '@cf/meta/llama-3-2-13b-chat-awq',
      label: 'Llama 3 2-13B Chat AWQ',
      provider: 'Cloudflare',
      maxTokenAllowed: 4096,
    },
  ];

  private _accountId: string | null = null;

  constructor() {
    super();
    this._initializeAccount();
  }

  private async _initializeAccount() {
    try {
      const headers = this._getHeaders();
      this._accountId = await this._fetchAccountId(headers);

      if (!this._accountId) {
        throw new Error('Could not retrieve Cloudflare Account ID');
      }
    } catch (error) {
      console.error('Error initializing Cloudflare provider:', error);
    }
  }

  getModelInstance(options: {
    model: string;
    serverEnv?: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    if (!this.staticModels.some((m) => m.name === options.model)) {
      throw new Error(`Model ${options.model} not found in Cloudflare provider.`);
    }

    return {
      modelId: options.model,
      specificationVersion: 'v1',
      provider: 'Cloudflare',
      defaultObjectGenerationMode: undefined,
      doGenerate: async (callOptions: LanguageModelV1CallOptions) => {
        const prompt = typeof callOptions.prompt === 'string' ? callOptions.prompt : JSON.stringify(callOptions.prompt);
        const modelName = options.model;

        const selectedModel = this.staticModels.find((model) => model.name === modelName);

        if (!selectedModel) {
          throw new Error(`Model ${modelName} not found in Cloudflare provider.`);
        }

        const responseText = await this._callModel(prompt, selectedModel.name);

        return {
          text: responseText,
          finishReason: 'stop' as const,
          usage: {
            promptTokens: prompt.split(/\s+/).length,
            completionTokens: responseText.split(/\s+/).length,
          },
          rawCall: { rawPrompt: prompt, rawSettings: {} },
        };
      },
      doStream: async () => {
        return {
          stream: new ReadableStream(),
          rawCall: {
            rawPrompt: '',
            rawSettings: {},
          },
        };
      },
    };
  }

  private async _callModel(prompt: string, modelName: string): Promise<string> {
    if (!this._accountId) {
      throw new Error('Cloudflare Account ID is not set.');
    }

    const headers = this._getHeaders();
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this._accountId}/ai/run/${modelName}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ prompt }),
      },
    );
    const data: any = await response.json();

    if (!data.success || !data.result?.response) {
      throw new Error(`Cloudflare AI Error: ${JSON.stringify(data)}`);
    }

    return data.result.response;
  }

  private async _fetchAccountId(headers: Headers): Promise<string | null> {
    try {
      const response = await fetch('https://api.cloudflare.com/client/v4/accounts', { method: 'GET', headers });
      const data: any = await response.json();

      if (!data.success) {
        throw new Error(`Failed to fetch accounts: ${JSON.stringify(data)}`);
      }

      return data.result.length > 0 ? data.result[0].id : null;
    } catch (error) {
      console.error('Error retrieving Cloudflare Account ID:', error);
      return null;
    }
  }

  private _getHeaders(): Headers {
    const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();

    if (!apiToken) {
      throw new Error('Cloudflare API Token is missing. Define CLOUDFLARE_API_TOKEN.');
    }

    return new Headers({
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    });
  }
}
