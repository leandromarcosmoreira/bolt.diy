import type { TabType } from './types';

export const TAB_ICONS: Record<TabType, string> = {
  profile: 'i-ph:user-circle-fill',
  settings: 'i-ph:gear-six-fill',
  notifications: 'i-ph:bell-fill',
  features: 'i-ph:star-fill',
  data: 'i-ph:database-fill',
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
  profile: 'Perfil',
  settings: 'Configurações',
  notifications: 'Notificações',
  features: 'Funcionalidades',
  data: 'Gerenciar Dados',
  'local-providers': 'Provedores Locais',
  'service-status': 'Status Serviço',
  connection: 'Conexão',
  debug: 'Debug',
  'event-logs': 'Logs de Eventos',
  update: 'Atualizações',
  'task-manager': 'Gerenciar Tarefas',
  'tab-management': 'Gerenciar Abas',
};

export const TAB_DESCRIPTIONS: Record<TabType, string> = {
  profile: 'Gerencie seu perfil e conta',
  settings: 'Ajuste preferências do app',
  notifications: 'Gerencie suas notificações',
  features: 'Descubra novidades e funções',
  data: 'Gerencie dados e arquivos',
  'local-providers': 'Configure IA local e modelos',
  'service-status': 'Monitore status de IA na nuvem',
  connection: 'Verifique status e ajustes de conexão',
  debug: 'Ferramentas e informações do sistema',
  'event-logs': 'Veja eventos e logs do sistema',
  update: 'Verifique atualizações e novidades',
  'task-manager': 'Gerencie recursos e processos',
  'tab-management': 'Configure abas e ordem',
};

export const DEFAULT_TAB_CONFIG = [
  // User Window Tabs (Always visible by default)
  { id: 'features', visible: true, window: 'user' as const, order: 0 },
  { id: 'data', visible: true, window: 'user' as const, order: 1 },
  { id: 'local-providers', visible: true, window: 'user' as const, order: 2 },
  { id: 'connection', visible: true, window: 'user' as const, order: 3 },
  { id: 'notifications', visible: true, window: 'user' as const, order: 4 },
  { id: 'event-logs', visible: true, window: 'user' as const, order: 5 },

  // User Tabs (Initially hidden)
  { id: 'profile', visible: false, window: 'user' as const, order: 6 },
  { id: 'settings', visible: false, window: 'user' as const, order: 7 },
  { id: 'task-manager', visible: false, window: 'user' as const, order: 8 },
  { id: 'service-status', visible: false, window: 'user' as const, order: 9 },
  { id: 'debug', visible: false, window: 'user' as const, order: 10 },
  { id: 'update', visible: false, window: 'user' as const, order: 11 },

  // Developer Tabs (All visible by default)
  { id: 'features', visible: true, window: 'developer' as const, order: 0 },
  { id: 'data', visible: true, window: 'developer' as const, order: 1 },
  { id: 'local-providers', visible: true, window: 'developer' as const, order: 2 },
  { id: 'connection', visible: true, window: 'developer' as const, order: 3 },
  { id: 'notifications', visible: true, window: 'developer' as const, order: 4 },
  { id: 'event-logs', visible: true, window: 'developer' as const, order: 5 },
  { id: 'profile', visible: true, window: 'developer' as const, order: 6 },
  { id: 'settings', visible: true, window: 'developer' as const, order: 7 },
  { id: 'task-manager', visible: true, window: 'developer' as const, order: 8 },
  { id: 'service-status', visible: true, window: 'developer' as const, order: 9 },
  { id: 'debug', visible: true, window: 'developer' as const, order: 10 },
  { id: 'update', visible: true, window: 'developer' as const, order: 11 },
  { id: 'tab-management', visible: true, window: 'developer' as const, order: 12 },
];
