import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { DialogRoot, DialogClose, Dialog, DialogTitle } from '~/components/ui/Dialog';
import { db, getAll, deleteById } from '~/lib/persistence';

export default function DataTab() {
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [isImportingKeys, setIsImportingKeys] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showResetInlineConfirm, setShowResetInlineConfirm] = useState(false);
  const [showDeleteInlineConfirm, setShowDeleteInlineConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiKeyFileInputRef = useRef<HTMLInputElement>(null);

  const handleExportAllChats = async () => {
    try {
      if (!db) {
        throw new Error('Database not initialized');
      }

      // Get all chats from IndexedDB
      const allChats = await getAll(db);
      const exportData = {
        chats: allChats,
        exportDate: new Date().toISOString(),
      };

      // Download as JSON
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bolt-chats-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Chats exportados com sucesso');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Falha ao exportar chats');
    }
  };

  const handleExportSettings = () => {
    try {
      const settings = {
        userProfile: localStorage.getItem('bolt_user_profile'),
        settings: localStorage.getItem('bolt_settings'),
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bolt-settings-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Configurações exportadas com sucesso');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Falha ao exportar configurações');
    }
  };

  const handleImportSettings = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const settings = JSON.parse(content);

      if (settings.userProfile) {
        localStorage.setItem('bolt_user_profile', settings.userProfile);
      }

      if (settings.settings) {
        localStorage.setItem('bolt_settings', settings.settings);
      }

      window.location.reload(); // Reload to apply settings
      toast.success('Configurações importadas com sucesso');
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Falha ao importar configurações');
    }
  };

  const handleImportAPIKeys = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsImportingKeys(true);

    try {
      const content = await file.text();
      const keys = JSON.parse(content);

      // Validate and save each key
      Object.entries(keys).forEach(([key, value]) => {
        if (typeof value !== 'string') {
          throw new Error(`Invalid value for key: ${key}`);
        }

        localStorage.setItem(`bolt_${key.toLowerCase()}`, value);
      });

      toast.success('Chaves da API importadas com sucesso');
    } catch (error) {
      console.error('Error importing API keys:', error);
      toast.error('Falha ao importar chaves da API');
    } finally {
      setIsImportingKeys(false);

      if (apiKeyFileInputRef.current) {
        apiKeyFileInputRef.current.value = '';
      }
    }
  };

  const handleDownloadTemplate = () => {
    setIsDownloadingTemplate(true);

    try {
      const template = {
        Anthropic_API_KEY: '',
        OpenAI_API_KEY: '',
        Google_API_KEY: '',
        Groq_API_KEY: '',
        HuggingFace_API_KEY: '',
        OpenRouter_API_KEY: '',
        Deepseek_API_KEY: '',
        Mistral_API_KEY: '',
        OpenAILike_API_KEY: '',
        Together_API_KEY: '',
        xAI_API_KEY: '',
        Perplexity_API_KEY: '',
        Cohere_API_KEY: '',
        AzureOpenAI_API_KEY: '',
        OPENAI_LIKE_API_BASE_URL: '',
        LMSTUDIO_API_BASE_URL: '',
        OLLAMA_API_BASE_URL: '',
        TOGETHER_API_BASE_URL: '',
      };

      const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bolt-api-keys-template.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Template baixado com sucesso');
    } catch (error) {
      console.error('Error downloading template:', error);
      toast.error('Falha ao baixar o template');
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const handleResetSettings = async () => {
    setIsResetting(true);

    try {
      // Clear all stored settings from localStorage
      localStorage.removeItem('bolt_user_profile');
      localStorage.removeItem('bolt_settings');
      localStorage.removeItem('bolt_chat_history');

      // Clear all data from IndexedDB
      if (!db) {
        throw new Error('Database not initialized');
      }

      // Get all chats and delete them
      const chats = await getAll(db as IDBDatabase);
      const deletePromises = chats.map((chat) => deleteById(db as IDBDatabase, chat.id));
      await Promise.all(deletePromises);

      // Close the dialog first
      setShowResetInlineConfirm(false);

      // Then reload and show success message
      window.location.reload();
      toast.success('Configurações restauradas com sucesso');
    } catch (error) {
      console.error('Reset error:', error);
      setShowResetInlineConfirm(false);
      toast.error('Falha ao restaurar configurações');
    } finally {
      setIsResetting(false);
    }
  };

  const handleDeleteAllChats = async () => {
    setIsDeleting(true);

    try {
      // Clear chat history from localStorage
      localStorage.removeItem('bolt_chat_history');

      // Clear chats from IndexedDB
      if (!db) {
        throw new Error('Database not initialized');
      }

      // Get all chats and delete them one by one
      const chats = await getAll(db as IDBDatabase);
      const deletePromises = chats.map((chat) => deleteById(db as IDBDatabase, chat.id));
      await Promise.all(deletePromises);

      // Close the dialog first
      setShowDeleteInlineConfirm(false);

      // Then show the success message
      toast.success('Histórico de chat deletado com sucesso');
    } catch (error) {
      console.error('Delete error:', error);
      setShowDeleteInlineConfirm(false);
      toast.error('Falha ao deletar o histórico de chat');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportSettings} className="hidden" />
      {/* Reset Settings Dialog */}
      <DialogRoot open={showResetInlineConfirm} onOpenChange={setShowResetInlineConfirm}>
        <Dialog showCloseButton={false} className="z-[1000]">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="i-ph:warning-circle-fill w-5 h-5 text-yellow-500" />
              <DialogTitle>Restaurar Todas as Configurações?</DialogTitle>
            </div>
            <p className="text-sm text-bolt-elements-textSecondary mt-2">
              Isso restaurará todas as suas configurações para os valores padrão. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end items-center gap-3 mt-6">
              <DialogClose asChild>
                <button className="px-4 py-2 rounded-lg text-sm bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#666666] dark:text-[#999999] hover:text-[#333333] dark:hover:text-white">
                  Cancelar
                </button>
              </DialogClose>
              <motion.button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white dark:bg-[#1A1A1A] text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 border border-transparent hover:border-yellow-500/10 dark:hover:border-yellow-500/20"
                onClick={handleResetSettings}
                disabled={isResetting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isResetting ? (
                  <div className="i-ph:spinner-gap-bold animate-spin w-4 h-4" />
                ) : (
                  <div className="i-ph:arrow-counter-clockwise w-4 h-4" />
                )}
                Restaurar Configurações
              </motion.button>
            </div>
          </div>
        </Dialog>
      </DialogRoot>

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={showDeleteInlineConfirm} onOpenChange={setShowDeleteInlineConfirm}>
        <Dialog showCloseButton={false} className="z-[1000]">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="i-ph:warning-circle-fill w-5 h-5 text-red-500" />
              <DialogTitle>Excluir Todos os Chats?</DialogTitle>
            </div>
            <p className="text-sm text-bolt-elements-textSecondary mt-2">
              Isso excluirá permanentemente todo o seu histórico de chat. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end items-center gap-3 mt-6">
              <DialogClose asChild>
                <button className="px-4 py-2 rounded-lg text-sm bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[#666666] dark:text-[#999999] hover:text-[#333333] dark:hover:text-white">
                  Cancelar
                </button>
              </DialogClose>
              <motion.button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-white dark:bg-[#1A1A1A] text-red-500 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-500/10 dark:hover:border-red-500/20"
                onClick={handleDeleteAllChats}
                disabled={isDeleting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isDeleting ? (
                  <div className="i-ph:spinner-gap-bold animate-spin w-4 h-4" />
                ) : (
                  <div className="i-ph:trash w-4 h-4" />
                )}
                Excluir Tudo
              </motion.button>
            </div>
          </div>
        </Dialog>
      </DialogRoot>

      {/* Chat History Section */}
      <motion.div
        className="bg-white dark:bg-[#0A0A0A] rounded-lg p-6 border border-[#E5E5E5] dark:border-[#1A1A1A]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="i-ph:chat-circle-duotone w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Histórico de Chat</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Exporte ou exclua todo o seu histórico de chat.</p>
        <div className="flex gap-4">
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportAllChats}
          >
            <div className="i-ph:download-simple w-4 h-4" />
            Exportar Todos os Chats
          </motion.button>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-500 text-sm hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDeleteInlineConfirm(true)}
          >
            <div className="i-ph:trash w-4 h-4" />
            Excluir Todos os Chats
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Backup Section */}
      <motion.div
        className="bg-white dark:bg-[#0A0A0A] rounded-lg p-6 border border-[#E5E5E5] dark:border-[#1A1A1A]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="i-ph:gear-duotone w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backup de Configurações</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Exporte suas configurações para um arquivo JSON ou importe configurações de um arquivo exportado
          anteriormente.
        </p>
        <div className="flex gap-4">
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportSettings}
          >
            <div className="i-ph:download-simple w-4 h-4" />
            Exportar Configurações
          </motion.button>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="i-ph:upload-simple w-4 h-4" />
            Importar Configurações
          </motion.button>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-50 text-yellow-600 text-sm hover:bg-yellow-100 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/20 dark:text-yellow-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowResetInlineConfirm(true)}
          >
            <div className="i-ph:arrow-counter-clockwise w-4 h-4" />
            Restaurar Configurações
          </motion.button>
        </div>
      </motion.div>

      {/* API Keys Management Section */}
      <motion.div
        className="bg-white dark:bg-[#0A0A0A] rounded-lg p-6 border border-[#E5E5E5] dark:border-[#1A1A1A]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="i-ph:key-duotone w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Gerenciamento de Chaves da API</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Importe chaves da API de um arquivo JSON ou baixe um modelo para preencher suas chaves.
        </p>
        <div className="flex gap-4">
          <input
            ref={apiKeyFileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportAPIKeys}
            className="hidden"
          />
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadTemplate}
            disabled={isDownloadingTemplate}
          >
            {isDownloadingTemplate ? (
              <div className="i-ph:spinner-gap-bold animate-spin w-4 h-4" />
            ) : (
              <div className="i-ph:download-simple w-4 h-4" />
            )}
            Baixar Modelo
          </motion.button>
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => apiKeyFileInputRef.current?.click()}
            disabled={isImportingKeys}
          >
            {isImportingKeys ? (
              <div className="i-ph:spinner-gap-bold animate-spin w-4 h-4" />
            ) : (
              <div className="i-ph:upload-simple w-4 h-4" />
            )}
            Importar Chaves da API
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
