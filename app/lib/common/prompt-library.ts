import { getSystemPrompt } from './prompts/prompts';
import optimized from './prompts/optimized';

export interface PromptOptions {
  cwd: string;
  allowedHtmlElements: string[];
  modificationTagName: string;
  supabase?: {
    isConnected: boolean;
    hasSelectedProject: boolean;
    credentials?: {
      anonKey?: string;
      supabaseUrl?: string;
    };
  };
}

export class PromptLibrary {
  static library: Record<
    string,
    {
      label: string;
      description: string;
      get: (options: PromptOptions) => string;
    }
  > = {
    default: {
      label: 'Prompt Padrão',
      description: 'Este é o prompt padrão de sistema testado em campo',
      get: (options) => getSystemPrompt(options.cwd, options.supabase),
    },
    optimized: {
      label: 'Prompt Otimizado (experimental)',
      description: 'Uma versão experimental do prompt para uso com menos tokens',
      get: (options) => optimized(options),
    },
  };
  static getList() {
    return Object.entries(this.library).map(([key, value]) => {
      const { label, description } = value;
      return {
        id: key,
        label,
        description,
      };
    });
  }
  static getPropmtFromLibrary(promptId: string, options: PromptOptions) {
    const prompt = this.library[promptId];

    if (!prompt) {
      throw 'Prompt não encontrado';
    }

    return this.library[promptId]?.get(options);
  }
}
