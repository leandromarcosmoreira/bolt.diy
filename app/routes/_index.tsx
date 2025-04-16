import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [
    { title: 'Bolt' },
    { name: 'description', content: 'Converse com o Bolt, um assistente de IA do StackBlitz' },
  ];
};

export const loader = () => json({});

/**
 * Componente da página inicial do Bolt
 * Nota: A funcionalidade de configurações deve ser acessada APENAS através do menu lateral.
 * Não adicione botão/painel de configurações a esta página inicial, pois foi intencionalmente removido
 * para manter a interface limpa e consistente com o sistema de design.
 */
export default function Index() {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
  );
}
