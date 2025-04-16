import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class AnthropicStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.anthropic.com/');
      const text = await statusPageResponse.text();

      // Check for specific Anthropic status indicators
      const isOperational = text.includes('Todos os sistemas operacionais');
      const hasDegradedPerformance = text.includes('Desempenho degradado');
      const hasPartialOutage = text.includes('Desempenho degradado');
      const hasMajorOutage = text.includes('Desempenho degradado');

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

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'Todos os sistemas operacionais';

      if (hasMajorOutage) {
        status = 'down';
        message = 'Desempenho degradado';
      } else if (hasPartialOutage) {
        status = 'down';
        message = 'Desempenho degradado';
      } else if (hasDegradedPerformance) {
        status = 'instavel';
        message = 'Desempenho degradado';
      } else if (!isOperational) {
        status = 'instavel';
        message = 'Status do serviço desconhecido';
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.anthropic.com/');
        const apiEndpoint = 'https://api.anthropic.com/v1/messages';
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
      console.error('Error checking Anthropic status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.anthropic.com/');
      const apiEndpoint = 'https://api.anthropic.com/v1/messages';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
