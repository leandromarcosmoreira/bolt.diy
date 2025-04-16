import { motion } from 'framer-motion';
import React, { Suspense, useState } from 'react';
import { classNames } from '~/utils/classNames';
import ConnectionDiagnostics from './ConnectionDiagnostics';
import { Button } from '~/components/ui/Button';
import VercelConnection from './VercelConnection';

// Use React.lazy for dynamic imports
const GitHubConnection = React.lazy(() => import('./GithubConnection'));
const NetlifyConnection = React.lazy(() => import('./NetlifyConnection'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="p-4 bg-bolt-elements-background-depth-1 dark:bg-bolt-elements-background-depth-1 rounded-lg border border-bolt-elements-borderColor dark:border-bolt-elements-borderColor">
    <div className="flex items-center justify-center gap-2 text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary">
      <div className="i-ph:spinner-gap w-4 h-4 animate-spin" />
      <span>Loading connection...</span>
    </div>
  </div>
);

export default function ConnectionsTab() {
  const [isEnvVarsExpanded, setIsEnvVarsExpanded] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <motion.div
        className="flex items-center justify-between gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2">
          <div className="i-ph:plugs-connected w-5 h-5 text-bolt-elements-item-contentAccent dark:text-bolt-elements-item-contentAccent" />
          <h2 className="text-lg font-medium text-bolt-elements-textPrimary dark:text-bolt-elements-textPrimary">
            Configurações de Conexão
          </h2>
        </div>
        <Button
          onClick={() => setShowDiagnostics(!showDiagnostics)}
          variant="outline"
          className="flex items-center gap-2 hover:bg-bolt-elements-item-backgroundActive/10 hover:text-bolt-elements-textPrimary dark:hover:bg-bolt-elements-item-backgroundActive/10 dark:hover:text-bolt-elements-textPrimary transition-colors"
        >
          {showDiagnostics ? (
            <>
              <div className="i-ph:eye-slash w-4 h-4" />
              Hide Diagnostics
            </>
          ) : (
            <>
              <div className="i-ph:wrench w-4 h-4" />
              Troubleshoot Connections
            </>
          )}
        </Button>
      </motion.div>
      <p className="text-sm text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary">
        Gerencie suas conexões com serviços externos e integrações
      </p>

      {/* Ferramenta de Diagnóstico - Condicionalmente renderizado */}
      {showDiagnostics && <ConnectionDiagnostics />}

      {/* Informações sobre Variáveis de Ambiente - Collapsible */}
      <motion.div
        className="bg-bolt-elements-background dark:bg-bolt-elements-background rounded-lg border border-bolt-elements-borderColor dark:border-bolt-elements-borderColor"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-6">
          <button
            onClick={() => setIsEnvVarsExpanded(!isEnvVarsExpanded)}
            className={classNames(
              'w-full bg-transparent flex items-center justify-between',
              'hover:bg-bolt-elements-item-backgroundActive/10 hover:text-bolt-elements-textPrimary',
              'dark:hover:bg-bolt-elements-item-backgroundActive/10 dark:hover:text-bolt-elements-textPrimary',
              'rounded-md p-2 -m-2 transition-colors',
            )}
          >
            <div className="flex items-center gap-2">
              <div className="i-ph:info w-5 h-5 text-bolt-elements-item-contentAccent dark:text-bolt-elements-item-contentAccent" />
              <h3 className="text-base font-medium text-bolt-elements-textPrimary dark:text-bolt-elements-textPrimary">
                Variáveis de Ambiente
              </h3>
            </div>
            <div
              className={classNames(
                'i-ph:caret-down w-4 h-4 text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary transition-transform',
                isEnvVarsExpanded ? 'rotate-180' : '',
              )}
            />
          </button>

          {isEnvVarsExpanded && (
            <div className="mt-4">
              <p className="text-sm text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary mb-2">
                Você pode configurar conexões usando variáveis de ambiente em seu{' '}
                <code className="px-1 py-0.5 bg-bolt-elements-background-depth-2 dark:bg-bolt-elements-background-depth-2 rounded">
                  .env.local
                </code>{' '}
                file:
              </p>
              <div className="bg-bolt-elements-background-depth-2 dark:bg-bolt-elements-background-depth-2 p-3 rounded-md text-xs font-mono overflow-x-auto">
                <div className="text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary">
                  # Autenticação GitHub
                </div>
                <div className="text-bolt-elements-textPrimary dark:text-bolt-elements-textPrimary">
                  VITE_GITHUB_ACCESS_TOKEN=your_token_here
                </div>
                <div className="text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary">
                  # Opcional: Especifique o tipo de token (padrão é 'classic' se não especificado)
                </div>
                <div className="text-bolt-elements-textPrimary dark:text-bolt-elements-textPrimary">
                  VITE_GITHUB_TOKEN_TYPE=classic|fine-grained
                </div>
                <div className="text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary mt-2">
                  # Netlify Authentication
                </div>
                <div className="text-bolt-elements-textPrimary dark:text-bolt-elements-textPrimary">
                  VITE_NETLIFY_ACCESS_TOKEN=your_token_here
                </div>
              </div>
              <div className="mt-3 text-xs text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary space-y-1">
                <p>
                  <span className="font-medium">Tipos de tokens:</span>
                </p>
                <ul className="list-disc list-inside pl-2 space-y-1">
                  <li>
                    <span className="font-medium">classic</span> - Token de Acesso Pessoal com{' '}
                    <code className="px-1 py-0.5 bg-bolt-elements-background-depth-2 dark:bg-bolt-elements-background-depth-2 rounded">
                      repo, read:org, read:user
                    </code>{' '}
                    scopes
                  </li>
                  <li>
                    <span className="font-medium">fine-grained</span> - Token de Acesso Detalhado com Acesso ao
                    Repositório e Organização
                  </li>
                </ul>
                <p className="mt-2">
                  Quando configurados, essas variáveis serão usadas automaticamente sem exigir conexão manual.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <Suspense fallback={<LoadingFallback />}>
          <GitHubConnection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <NetlifyConnection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <VercelConnection />
        </Suspense>
      </div>

      {/* Texto de ajuda adicional */}
      <div className="text-sm text-bolt-elements-textSecondary dark:text-bolt-elements-textSecondary bg-bolt-elements-background-depth-2 dark:bg-bolt-elements-background-depth-2 p-4 rounded-lg">
        <p className="flex items-center gap-1 mb-2">
          <span className="i-ph:lightbulb w-4 h-4 text-bolt-elements-icon-success dark:text-bolt-elements-icon-success" />
          <span className="font-medium">Dica de Solução de Problemas:</span>
        </p>
        <p className="mb-2">
          Se estiver com problemas com as conexões, tente usar a ferramenta de solução de problemas na parte superior
          desta página. Pode ajudar a diagnosticar e resolver problemas comuns de conexão.
        </p>
        <p>Para problemas persistentes:</p>
        <ol className="list-decimal list-inside pl-4 mt-1">
          <li>Verifique o console do seu navegador para erros</li>
          <li>Verifique se seus tokens têm as permissões corretas</li>
          <li>Tente limpar o cache do seu navegador e cookies</li>
          <li>Certifique-se de que seu navegador permite cookies de terceiros se estiver usando integrações</li>
        </ol>
      </div>
    </div>
  );
}
