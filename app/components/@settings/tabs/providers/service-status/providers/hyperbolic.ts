import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class HyperbolicStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      /*
       * Check API endpoint directly since Hyperbolic is a newer provider
       * and may not have a public status page yet
       */
      const apiEndpoint = 'https://api.hyperbolic.ai/v1/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      // Check their website as a secondary indicator
      const websiteStatus = await this.checkEndpoint('https://hyperbolic.ai');

      let status: StatusCheckResult['status'] = 'operacional';
      let message = 'All systems operacional';

      if (apiStatus !== 'acessivel' || websiteStatus !== 'acessivel') {
        status = apiStatus !== 'acessivel' ? 'down' : 'instavel';
        message = apiStatus !== 'acessivel' ? 'API appears to be down' : 'Service may be experiencing issues';
      }

      return {
        status,
        message,
        incidents: [], // No public incident tracking available yet
      };
    } catch (error) {
      console.error('Error checking Hyperbolic status:', error);

      return {
        status: 'instavel',
        message: 'Unable to determine service status',
        incidents: ['Note: Limited status information available'],
      };
    }
  }
}
