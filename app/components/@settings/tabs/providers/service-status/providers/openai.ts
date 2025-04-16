import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class OpenAIStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.openai.com/');
      const text = await statusPageResponse.text();

      // Check individual services
      const services = {
        api: {
          operacional: text.includes('API ?  Operacional'),
          instavel: text.includes('API ?  Desempenho degradado'),
          outage: text.includes('API ?  Desempenho degradado') || text.includes('API ?  Desempenho degradado'),
        },
        chat: {
          operacional: text.includes('ChatGPT ?  Operacional'),
          instavel: text.includes('ChatGPT ?  Desempenho degradado'),
          outage: text.includes('ChatGPT ?  Desempenho degradado') || text.includes('ChatGPT ?  Desempenho degradado'),
        },
      };

      // Extract recent incidents
      const incidents: string[] = [];
      const incidentMatches = text.match(/Past Incidents(.*?)(?=\w+ \d+, \d{4})/s);

      if (incidentMatches) {
        const recentIncidents = incidentMatches[1]
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && line.includes('202')); // Get only dated incidents

        incidents.push(...recentIncidents.slice(0, 5));
      }

      // Determine overall status
      let status: StatusCheckResult['status'] = 'operacional';
      const messages: string[] = [];

      if (services.api.outage || services.chat.outage) {
        status = 'down';

        if (services.api.outage) {
          messages.push('API: Desempenho degradado');
        }

        if (services.chat.outage) {
          messages.push('ChatGPT: Desempenho degradado');
        }
      } else if (services.api.instavel || services.chat.instavel) {
        status = 'instavel';

        if (services.api.instavel) {
          messages.push('API: Desempenho degradado');
        }

        if (services.chat.instavel) {
          messages.push('ChatGPT: Desempenho degradado');
        }
      } else if (services.api.operacional) {
        messages.push('API: Operacional');
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.openai.com/');
        const apiEndpoint = 'https://api.openai.com/v1/models';
        const apiStatus = await this.checkEndpoint(apiEndpoint);

        return {
          status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
          message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
          incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
        };
      }

      return {
        status,
        message: messages.join(', ') || 'Status unknown',
        incidents,
      };
    } catch (error) {
      console.error('Error checking OpenAI status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.openai.com/');
      const apiEndpoint = 'https://api.openai.com/v1/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
