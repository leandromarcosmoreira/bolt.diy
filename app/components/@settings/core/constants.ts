import type { TabType } from './types';

export const TAB_ICONS: Record<TabType, string> = {
  profile: 'i-ph:user-circle-fill',
  settings: 'i-ph:gear-six-fill',
  notifications: 'i-ph:bell-fill',
  features: 'i-ph:star-fill',
  data: 'i-ph:database-fill',
  'cloud-providers': 'i-ph:cloud-fill',
  'local-providers': 'i-ph:desktop-fill',
  'service-status': 'i-ph:activity-bold',
  connection: 'i-ph:wifi-high-fill',
  debug: 'i-ph:bug-fill',
  'event-logs': 'i-ph:list-bullets-fill',
  update: 'i-ph:arrow-clockwise-fill',
  'task-manager': 'i-ph:chart-line-fill',
  'tab-management': 'i-ph:squares-four-fill',
};

export const TAB_LABELS: Record<TabType, string> = {
  profile: 'Profile',
  settings: 'Configurações',
  notifications: 'Notificações',
  features: 'Recursos',
  data: 'Gerenciamento de Dados',
  'cloud-providers': 'Provedores de Nuvem',
  'local-providers': 'Provedores Locais',
  'service-status': 'Status do Serviço',
  connection: 'Conexão',
  debug: 'Depuração',
  'event-logs': 'Logs de Eventos',
  update: 'Atualizações',
  'task-manager': 'Gerenciador de Tarefas',
  'tab-management': 'Gerenciamento de Abas',
};

export const TAB_DESCRIPTIONS: Record<TabType, string> = {
  profile: 'Gerencie seu Profile e configurações de conta',
  settings: 'Configure as preferências do aplicativo',
  notifications: 'Visualize e gerencie suas notificações',
  features: 'Explore recursos novos e futuros',
  data: 'Gerencie seus dados e armazenamento',
  'cloud-providers': 'Configure provedores e modelos de IA na nuvem',
  'local-providers': 'Configure provedores e modelos de IA locais',
  'service-status': 'Monitore o status dos serviços de LLM na nuvem',
  connection: 'Verifique o status e as configurações de conexão',
  debug: 'Ferramentas de depuração e informações do system',
  'event-logs': 'Visualize eventos e logs do system',
  update: 'Verifique atualizações e notas de versão',
  'task-manager': 'Monitore recursos e processos do system',
  'tab-management': 'Configure as abas visíveis e sua ordem',
};

export const DEFAULT_TAB_CONFIG = [
  // User Window Tabs (Always visible by default)
  { id: 'features', visible: true, window: 'user' as const, order: 0 },
  { id: 'data', visible: true, window: 'user' as const, order: 1 },
  { id: 'cloud-providers', visible: true, window: 'user' as const, order: 2 },
  { id: 'local-providers', visible: true, window: 'user' as const, order: 3 },
  { id: 'connection', visible: true, window: 'user' as const, order: 4 },
  { id: 'notifications', visible: true, window: 'user' as const, order: 5 },
  { id: 'event-logs', visible: true, window: 'user' as const, order: 6 },

  // User Window Tabs (In dropdown, initially hidden)
  { id: 'profile', visible: false, window: 'user' as const, order: 7 },
  { id: 'settings', visible: false, window: 'user' as const, order: 8 },
  { id: 'task-manager', visible: false, window: 'user' as const, order: 9 },
  { id: 'service-status', visible: false, window: 'user' as const, order: 10 },

  // User Window Tabs (Hidden, controlled by TaskManagerTab)
  { id: 'debug', visible: false, window: 'user' as const, order: 11 },
  { id: 'update', visible: false, window: 'user' as const, order: 12 },

  // Developer Window Tabs (All visible by default)
  { id: 'features', visible: true, window: 'developer' as const, order: 0 },
  { id: 'data', visible: true, window: 'developer' as const, order: 1 },
  { id: 'cloud-providers', visible: true, window: 'developer' as const, order: 2 },
  { id: 'local-providers', visible: true, window: 'developer' as const, order: 3 },
  { id: 'connection', visible: true, window: 'developer' as const, order: 4 },
  { id: 'notifications', visible: true, window: 'developer' as const, order: 5 },
  { id: 'event-logs', visible: true, window: 'developer' as const, order: 6 },
  { id: 'profile', visible: true, window: 'developer' as const, order: 7 },
  { id: 'settings', visible: true, window: 'developer' as const, order: 8 },
  { id: 'task-manager', visible: true, window: 'developer' as const, order: 9 },
  { id: 'service-status', visible: true, window: 'developer' as const, order: 10 },
  { id: 'debug', visible: true, window: 'developer' as const, order: 11 },
  { id: 'update', visible: true, window: 'developer' as const, order: 12 },
];
