import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class TogetherStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.together.ai/');
      const text = await statusPageResponse.text();

      // Check for specific Together status indicators
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
        inference: {
          operacional: text.includes('Inference Service') && text.includes('Operacional'),
          instavel: text.includes('Inference Service') && text.includes('Desempenho degradado'),
          outage: text.includes('Inference Service') && text.includes('Desempenho degradado'),
        },
      };

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'All systems operacional';

      if (services.api.outage || services.inference.outage || hasOutage) {
        status = 'down';
        message = 'Service outage detected';
      } else if (services.api.instavel || services.inference.instavel || hasDegradation || hasIncidents) {
        status = 'instavel';
        message = 'Service experiencing issues';
      } else if (!isOperational) {
        status = 'instavel';
        message = 'Service status unknown';
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.together.ai/');
        const apiEndpoint = 'https://api.together.ai/v1/models';
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
      console.error('Error checking Together status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.together.ai/');
      const apiEndpoint = 'https://api.together.ai/v1/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
