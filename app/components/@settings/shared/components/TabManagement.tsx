import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { Switch } from '~/components/ui/Switch';
import { classNames } from '~/utils/classNames';
import { tabConfigurationStore } from '~/lib/stores/settings';
import { TAB_LABELS } from '~/components/@settings/core/constants';
import type { TabType } from '~/components/@settings/core/types';
import { toast } from 'react-toastify';
import { TbLayoutGrid } from 'react-icons/tb';
import { useSettingsStore } from '~/lib/stores/settings';

// Mapeamento dos ícones das abas
const TAB_ICONS: Record<TabType, string> = {
  profile: 'i-ph:user-circle-fill',
  settings: 'i-ph:gear-six-fill',
  notifications: 'i-ph:bell-fill',
  features: 'i-ph:star-fill',
  data: 'i-ph:database-fill',
  'local-providers': 'i-ph:desktop-fill',
  'service-status': 'i-ph:activity-fill',
  connection: 'i-ph:wifi-high-fill',
  debug: 'i-ph:bug-fill',
  'event-logs': 'i-ph:list-bullets-fill',
  update: 'i-ph:arrow-clockwise-fill',
  'task-manager': 'i-ph:chart-line-fill',
  'tab-management': 'i-ph:squares-four-fill',
};

// Define quais abas são padrão no modo usuário
const DEFAULT_USER_TABS: TabType[] = [
  'features',
  'data',
  'local-providers',
  'connection',
  'notifications',
  'event-logs',
];

// Define quais abas podem ser adicionadas no modo usuário
const OPTIONAL_USER_TABS: TabType[] = ['profile', 'settings', 'task-manager', 'service-status', 'debug', 'update'];

// Todas as abas disponíveis no modo usuário
const ALL_USER_TABS = [...DEFAULT_USER_TABS, ...OPTIONAL_USER_TABS];

// Define quais abas estão em beta
const BETA_TABS = new Set<TabType>(['task-manager', 'service-status', 'update', 'local-providers']);

// Componente do rótulo beta
const BetaLabel = () => (
  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-purple-500/10 text-purple-500 font-medium">BETA</span>
);

export const TabManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const tabConfiguration = useStore(tabConfigurationStore);
  const { setSelectedTab } = useSettingsStore();

  const handleTabVisibilityChange = (tabId: TabType, checked: boolean) => {
    // Obtém configuração atual da aba
    const currentTab = tabConfiguration.userTabs.find((tab) => tab.id === tabId);

    // Se a aba não existe na configuração, cria ela
    if (!currentTab) {
      const newTab = {
        id: tabId,
        visible: checked,
        window: 'user' as const,
        order: tabConfiguration.userTabs.length,
      };

      const updatedTabs = [...tabConfiguration.userTabs, newTab];

      tabConfigurationStore.set({
        ...tabConfiguration,
        userTabs: updatedTabs,
      });

      toast.success(`Aba ${checked ? 'ativada' : 'desativada'} com sucesso`);

      return;
    }

    // Verifica se a aba pode ser ativada no modo usuário
    const canBeEnabled = DEFAULT_USER_TABS.includes(tabId) || OPTIONAL_USER_TABS.includes(tabId);

    if (!canBeEnabled && checked) {
      toast.error('Esta aba não pode ser ativada no modo usuário');
      return;
    }

    // Atualiza visibilidade da aba
    const updatedTabs = tabConfiguration.userTabs.map((tab) => {
      if (tab.id === tabId) {
        return { ...tab, visible: checked };
      }

      return tab;
    });

    // Atualiza o store
    tabConfigurationStore.set({
      ...tabConfiguration,
      userTabs: updatedTabs,
    });

    // Exibe mensagem de sucesso
    toast.success(`Aba ${checked ? 'ativada' : 'desativada'} com sucesso`);
  };

  // Cria um mapa das configurações existentes
  const tabConfigMap = new Map(tabConfiguration.userTabs.map((tab) => [tab.id, tab]));

  // Gera lista completa de abas, incluindo as não configuradas
  const allTabs = ALL_USER_TABS.map((tabId) => {
    return (
      tabConfigMap.get(tabId) || {
        id: tabId,
        visible: false,
        window: 'user' as const,
        order: -1,
      }
    );
  });

  // Filtra abas baseado na busca
  const filteredTabs = allTabs.filter((tab) => TAB_LABELS[tab.id].toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    // Reseta para primeira aba ao desmontar
    return () => {
      setSelectedTab('user'); // Reseta para aba usuário ao desmontar
    };
  }, [setSelectedTab]);

  return (
    <div className="space-y-6">
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between gap-4 mt-8 mb-4">
          <div className="flex items-center gap-2">
            <div
              className={classNames(
                'w-8 h-8 flex items-center justify-center rounded-lg',
                'bg-bolt-elements-background-depth-3',
                'text-purple-500',
              )}
            >
              <TbLayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-md font-medium text-bolt-elements-textPrimary">Gerenciar Abas</h4>
              <p className="text-sm text-bolt-elements-textSecondary">Configure abas visíveis e sua ordem</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="i-ph:magnifying-glass w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar abas..."
              className={classNames(
                'w-full pl-10 pr-4 py-2 rounded-lg',
                'bg-bolt-elements-background-depth-2',
                'border border-bolt-elements-borderColor',
                'text-bolt-elements-textPrimary',
                'placeholder-bolt-elements-textTertiary',
                'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
                'transition-all duration-200',
              )}
            />
          </div>
        </div>

        {/* Grade de Abas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cabeçalho da Seção Padrão */}
          {filteredTabs.some((tab) => DEFAULT_USER_TABS.includes(tab.id)) && (
            <div className="col-span-full flex items-center gap-2 mt-4 mb-2">
              <div className="i-ph:star-fill w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Abas Padrão</span>
            </div>
          )}

          {/* Abas Padrão */}
          {filteredTabs
            .filter((tab) => DEFAULT_USER_TABS.includes(tab.id))
            .map((tab, index) => (
              <motion.div
                key={tab.id}
                className={classNames(
                  'rounded-lg border bg-bolt-elements-background text-bolt-elements-textPrimary',
                  'bg-bolt-elements-background-depth-2',
                  'hover:bg-bolt-elements-background-depth-3',
                  'transition-all duration-200',
                  'relative overflow-hidden group',
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Status Badges */}
                <div className="absolute top-1 right-1.5 flex gap-1">
                  <span className="px-1.5 py-0.25 text-xs rounded-full bg-purple-500/10 text-purple-500 font-medium mr-2">
                    Padrão
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <motion.div
                    className={classNames(
                      'w-10 h-10 flex items-center justify-center rounded-xl',
                      'bg-bolt-elements-background-depth-3 group-hover:bg-bolt-elements-background-depth-4',
                      'transition-all duration-200',
                      tab.visible ? 'text-purple-500' : 'text-bolt-elements-textSecondary',
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={classNames('w-6 h-6', 'transition-transform duration-200', 'group-hover:rotate-12')}
                    >
                      <div className={classNames(TAB_ICONS[tab.id], 'w-full h-full')} />
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-bolt-elements-textPrimary group-hover:text-purple-500 transition-colors">
                            {TAB_LABELS[tab.id]}
                          </h4>
                          {BETA_TABS.has(tab.id) && <BetaLabel />}
                        </div>
                        <p className="text-xs text-bolt-elements-textSecondary mt-0.5">
                          {tab.visible ? 'Visível no modo usuário' : 'Oculta no modo usuário'}
                        </p>
                      </div>
                      <Switch
                        checked={tab.visible}
                        onCheckedChange={(checked) => {
                          const isDisabled =
                            !DEFAULT_USER_TABS.includes(tab.id) && !OPTIONAL_USER_TABS.includes(tab.id);

                          if (!isDisabled) {
                            handleTabVisibilityChange(tab.id, checked);
                          }
                        }}
                        className={classNames('data-[state=checked]:bg-purple-500 ml-4', {
                          'opacity-50 pointer-events-none':
                            !DEFAULT_USER_TABS.includes(tab.id) && !OPTIONAL_USER_TABS.includes(tab.id),
                        })}
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 border-2 border-purple-500/0 rounded-lg pointer-events-none"
                  animate={{
                    borderColor: tab.visible ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0)',
                    scale: tab.visible ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}

          {/* Cabeçalho da Seção Opcional */}
          {filteredTabs.some((tab) => OPTIONAL_USER_TABS.includes(tab.id)) && (
            <div className="col-span-full flex items-center gap-2 mt-8 mb-2">
              <div className="i-ph:plus-circle-fill w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Abas Opcionais</span>
            </div>
          )}

          {/* Abas Opcionais */}
          {filteredTabs
            .filter((tab) => OPTIONAL_USER_TABS.includes(tab.id))
            .map((tab, index) => (
              <motion.div
                key={tab.id}
                className={classNames(
                  'rounded-lg border bg-bolt-elements-background text-bolt-elements-textPrimary',
                  'bg-bolt-elements-background-depth-2',
                  'hover:bg-bolt-elements-background-depth-3',
                  'transition-all duration-200',
                  'relative overflow-hidden group',
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Status Badges */}
                <div className="absolute top-1 right-1.5 flex gap-1">
                  <span className="px-1.5 py-0.25 text-xs rounded-full bg-blue-500/10 text-blue-500 font-medium mr-2">
                    Opcional
                  </span>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <motion.div
                    className={classNames(
                      'w-10 h-10 flex items-center justify-center rounded-xl',
                      'bg-bolt-elements-background-depth-3 group-hover:bg-bolt-elements-background-depth-4',
                      'transition-all duration-200',
                      tab.visible ? 'text-purple-500' : 'text-bolt-elements-textSecondary',
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={classNames('w-6 h-6', 'transition-transform duration-200', 'group-hover:rotate-12')}
                    >
                      <div className={classNames(TAB_ICONS[tab.id], 'w-full h-full')} />
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-bolt-elements-textPrimary group-hover:text-purple-500 transition-colors">
                            {TAB_LABELS[tab.id]}
                          </h4>
                          {BETA_TABS.has(tab.id) && <BetaLabel />}
                        </div>
                        <p className="text-xs text-bolt-elements-textSecondary mt-0.5">
                          {tab.visible ? 'Visível no modo usuário' : 'Oculta no modo usuário'}
                        </p>
                      </div>
                      <Switch
                        checked={tab.visible}
                        onCheckedChange={(checked) => {
                          const isDisabled =
                            !DEFAULT_USER_TABS.includes(tab.id) && !OPTIONAL_USER_TABS.includes(tab.id);

                          if (!isDisabled) {
                            handleTabVisibilityChange(tab.id, checked);
                          }
                        }}
                        className={classNames('data-[state=checked]:bg-purple-500 ml-4', {
                          'opacity-50 pointer-events-none':
                            !DEFAULT_USER_TABS.includes(tab.id) && !OPTIONAL_USER_TABS.includes(tab.id),
                        })}
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 border-2 border-purple-500/0 rounded-lg pointer-events-none"
                  animate={{
                    borderColor: tab.visible ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0)',
                    scale: tab.visible ? 1 : 0.98,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};
