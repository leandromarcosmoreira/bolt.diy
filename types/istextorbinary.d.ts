/**
 * @note Por algum motivo os tipos não são detectados do node_modules então eu declarei o módulo aqui
 * com apenas a função que usamos.
 */
declare module 'istextorbinary' {
  export interface EncodingOpts {
    /** Padrão é 24 */
    chunkLength?: number;

    /** Se não fornecido, verificará o início, começo e fim */
    chunkBegin?: number;
  }

  export function getEncoding(buffer: Buffer | null, opts?: EncodingOpts): 'utf8' | 'binary' | null;
}
