import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

interface CloudflareStatusResponse {
  status: {
    indicator: string;
    description: string;
  };
}

interface CloudflareIncidentsResponse {
  incidents: Array<{
    name: string;
    status: string;
    impact: string;
    updated_at: string;
  }>;
}

export class CloudflareStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      const statusResponse = await fetch('https://www.cloudflarestatus.com/api/v2/status.json');
      const statusData: CloudflareStatusResponse = await statusResponse.json();

      const incidentsResponse = await fetch('https://www.cloudflarestatus.com/api/v2/incidents.json');
      const incidentsData: CloudflareIncidentsResponse = await incidentsResponse.json();

      const statusMap: Record<string, StatusCheckResult['status']> = {
        operational: 'operational',
        degraded_performance: 'degraded',
        partial_outage: 'degraded',
        major_outage: 'down',
      };

      return {
        status: statusMap[statusData.status.indicator] || 'down',
        message: statusData.status.description,
        incidents: incidentsData.incidents.map((incident) => incident.name),
      };
    } catch {
      return { status: 'down', message: 'Erro ao obter status da Cloudflare.', incidents: [] };
    }
  }
}
