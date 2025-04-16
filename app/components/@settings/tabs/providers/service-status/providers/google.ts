import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class GoogleStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.cloud.google.com/');
      const text = await statusPageResponse.text();

      // Check for Vertex AI and general cloud status
      const hasVertexAIIssues =
        text.includes('Vertex AI') &&
        (text.includes('Incident') ||
          text.includes('Disruption') ||
          text.includes('Outage') ||
          text.includes('instavel'));

      const hasGeneralIssues = text.includes('Major Incidents') || text.includes('Service Disruption');

      // Extract incidents
      const incidents: string[] = [];
      const incidentMatches = text.matchAll(/(\d{4}-\d{2}-\d{2})\s+(.*?)\s+Impact:(.*?)(?=\n|$)/g);

      for (const match of incidentMatches) {
        const [, date, title, impact] = match;

        if (title.includes('Vertex AI') || title.includes('Cloud')) {
          incidents.push(`${date}: ${title.trim()} - Impact: ${impact.trim()}`);
        }
      }

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'All services operacional';

      if (hasVertexAIIssues) {
        status = 'instavel';
        message = 'Vertex AI service issues reported';
      } else if (hasGeneralIssues) {
        status = 'instavel';
        message = 'Google Cloud experiencing issues';
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.cloud.google.com/');
        const apiEndpoint = 'https://generativelanguage.googleapis.com/v1/models';
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
        incidents: incidents.slice(0, 5),
      };
    } catch (error) {
      console.error('Error checking Google status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.cloud.google.com/');
      const apiEndpoint = 'https://generativelanguage.googleapis.com/v1/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
