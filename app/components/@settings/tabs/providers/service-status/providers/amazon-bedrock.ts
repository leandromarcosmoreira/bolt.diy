import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class AmazonBedrockStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check AWS health status page
      const statusPageResponse = await fetch('https://health.aws.amazon.com/health/status');
      const text = await statusPageResponse.text();

      // Check for Bedrock and general AWS status
      const hasBedrockIssues =
        text.includes('Amazon Bedrock') &&
        (text.includes('Service is experiencing elevated error rates') ||
          text.includes('Service disruption') ||
          text.includes('Degraded Service'));

      const hasGeneralIssues = text.includes('Service disruption') || text.includes('Multiple services affected');

      // Extract incidents
      const incidents: string[] = [];
      const incidentMatches = text.matchAll(/(\d{4}-\d{2}-\d{2})\s+(.*?)\s+Impact:(.*?)(?=\n|$)/g);

      for (const match of incidentMatches) {
        const [, date, title, impact] = match;

        if (title.includes('Bedrock') || title.includes('AWS')) {
          incidents.push(`${date}: ${title.trim()} - Impact: ${impact.trim()}`);
        }
      }

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'All services operacional';

      if (hasBedrockIssues) {
        status = 'instavel';
        message = 'Amazon Bedrock service issues reported';
      } else if (hasGeneralIssues) {
        status = 'instavel';
        message = 'AWS experiencing general issues';
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://health.aws.amazon.com/health/status');
        const apiEndpoint = 'https://bedrock.us-east-1.amazonaws.com/models';
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
      console.error('Error checking Amazon Bedrock status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://health.aws.amazon.com/health/status');
      const apiEndpoint = 'https://bedrock.us-east-1.amazonaws.com/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
