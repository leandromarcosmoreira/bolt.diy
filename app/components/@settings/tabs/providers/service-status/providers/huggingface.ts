import { BaseProviderChecker } from '~/components/@settings/tabs/providers/service-status/base-provider';
import type { StatusCheckResult } from '~/components/@settings/tabs/providers/service-status/types';

export class HuggingFaceStatusChecker extends BaseProviderChecker {
  async checkStatus(): Promise<StatusCheckResult> {
    try {
      // Check status page
      const statusPageResponse = await fetch('https://status.huggingface.co/');
      const text = await statusPageResponse.text();

      // Check for "All services are online" message
      const allServicesOnline = text.includes('All services are online');

      // Get last update time
      const lastUpdateMatch = text.match(/Last updated on (.*?)(EST|PST|GMT)/);
      const lastUpdate = lastUpdateMatch ? `${lastUpdateMatch[1]}${lastUpdateMatch[2]}` : '';

      // Check individual services and their uptime percentages
      const services = {
        'Huggingface Hub': {
          operacional: text.includes('Huggingface Hub') && text.includes('Operacional'),
          uptime: text.match(/Huggingface Hub[\s\S]*?(\d+\.\d+)%\s*uptime/)?.[1],
        },
        'Git Hosting and Serving': {
          operacional: text.includes('Git Hosting and Serving') && text.includes('Operacional'),
          uptime: text.match(/Git Hosting and Serving[\s\S]*?(\d+\.\d+)%\s*uptime/)?.[1],
        },
        'Inference API': {
          operacional: text.includes('Inference API') && text.includes('Operacional'),
          uptime: text.match(/Inference API[\s\S]*?(\d+\.\d+)%\s*uptime/)?.[1],
        },
        'HF Endpoints': {
          operacional: text.includes('HF Endpoints') && text.includes('Operacional'),
          uptime: text.match(/HF Endpoints[\s\S]*?(\d+\.\d+)%\s*uptime/)?.[1],
        },
        Spaces: {
          operacional: text.includes('Spaces') && text.includes('Operacional'),
          uptime: text.match(/Spaces[\s\S]*?(\d+\.\d+)%\s*uptime/)?.[1],
        },
      };

      // Create service status messages with uptime
      const serviceMessages = Object.entries(services).map(([name, info]) => {
        if (info.uptime) {
          return `${name}: ${info.uptime}% uptime`;
        }

        return `${name}: ${info.operacional ? 'Operacional' : 'Desempenho degradado'}`;
      });

      // Determine overall status
      let status: StatusCheckResult['status'] = 'operacional';
      let message = allServicesOnline
        ? `Todos os serviços estão online (Última atualização em ${lastUpdate})`
        : 'Verificando serviços individuais';

      // Only mark as instavel if we explicitly detect issues
      const hasIssues = Object.values(services).some((service) => !service.operacional);

      if (hasIssues) {
        status = 'instavel';
        message = `Problemas detectados (Última atualização em ${lastUpdate})`;
      }

      // If status page check fails, fallback to endpoint check
      if (!statusPageResponse.ok) {
        const endpointStatus = await this.checkEndpoint('https://status.huggingface.co/');
        const apiEndpoint = 'https://api-inference.huggingface.co/models';
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
        incidents: serviceMessages,
      };
    } catch (error) {
      console.error('Error checking HuggingFace status:', error);

      // Fallback to basic endpoint check
      const endpointStatus = await this.checkEndpoint('https://status.huggingface.co/');
      const apiEndpoint = 'https://api-inference.huggingface.co/models';
      const apiStatus = await this.checkEndpoint(apiEndpoint);

      return {
        status: endpointStatus === 'acessivel' && apiStatus === 'acessivel' ? 'operacional' : 'instavel',
        message: `Página de status: ${endpointStatus}, API: ${apiStatus}`,
        incidents: ['Nota: Informações de status limitadas devido a restrições de CORS'],
      };
    }
  }
}
