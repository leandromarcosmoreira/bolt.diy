/**
 * Limpa URLs do webcontainer de stack traces para mostrar caminhos relativos
 */
export function cleanStackTrace(stackTrace: string): string {
  // Função para limpar uma única URL
  const cleanUrl = (url: string): string => {
    const regex = /^https?:\/\/[^\/]+\.webcontainer-api\.io(\/.*)?$/;

    if (!regex.test(url)) {
      return url;
    }

    const pathRegex = /^https?:\/\/[^\/]+\.webcontainer-api\.io\/(.*?)$/;
    const match = url.match(pathRegex);

    return match?.[1] || '';
  };

  // Divide o stack trace em linhas e processa cada linha
  return stackTrace
    .split('\n')
    .map((line) => {
      // Encontra qualquer URL na linha que contenha webcontainer-api.io
      return line.replace(/(https?:\/\/[^\/]+\.webcontainer-api\.io\/[^\s\)]+)/g, (match) => cleanUrl(match));
    })
    .join('\n');
}
