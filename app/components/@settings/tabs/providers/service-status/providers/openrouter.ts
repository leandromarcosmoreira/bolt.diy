import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class OpenRouterStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.openrouter.ai/');
      const text = await statusPageResponse.text();

      // Check for specific OpenRouter status indicators
      const isOperational = text.includes('Todos os sistemas operacionais');
      const hasIncidents = text.includes('Incidentes ativos');
      const hasDegradation = text.includes('Desempenho degradado');
      const hasOutage = text.includes('Desempenho degradado');

      // Extract incidents
      const incidents: string[] = [];
      const incidentSection = text.match(/Past Incidents(.*?)(?=\n\n)/s);

      if (incidentSection) {
        const incidentLines = incidentSection[1]
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && line.includes('202')); // Only get dated incidents

        incidents.push(...incidentLines.slice(0, 5));
      }

      // Check specific services
      const services = {
        api: {
          operacional: text.includes('API Service') && text.includes('Operacional'),
          instavel: text.includes('API Service') && text.includes('Desempenho degradado'),
          outage: text.includes('API Service') && text.includes('Desempenho degradado'),
        },
        routing: {
          operacional: text.includes('Routing Service') && text.includes('Operacional'),
          instavel: text.includes('Routing Service') && text.includes('Desempenho degradado'),
          outage: text.includes('Routing Service') && text.includes('Desempenho degradado'),
        },
      };

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'Todos os sistemas operacionais';

      if (services.api.outage || services.routing.outage || hasOutage) {
        status = 'down';
        message = 'Desempenho degradado';
      } else if (services.api.instavel || services.routing.instavel || hasDegradation || hasIncidents) {
        status = 'instavel';
        message = 'Desempenho degradado';
      } else if (!isOperational) {
        status = 'instavel';
        message = 'Status do serviço desconhecido';
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.openrouter.ai/');
        const apiEndpoint = 'https://openrouter.ai/api/v1/models';
        const apiStatus = await this.checkEndpoint(apiEndpoint);

        return {
          status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
          message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
          incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
        };
      }

      return {
        status,
        message,
        incidents,
      };
    } catch (error) {
      console.error('Error checking OpenRouter status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.openrouter.ai/');
      const apiEndpoint = 'https://openrouter.ai/api/v1/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
