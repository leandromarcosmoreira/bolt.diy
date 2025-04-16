export function bufferWatchEvents<T extends unknown[]>(timeInMs: number, cb: (events: T[]) => unknown) {
  let timeoutId: number | undefined;
  let events: T[] = [];

  // mantém o controle do processamento do lote anterior para que possamos esperar por ele
  let processing: Promise<unknown> = Promise.resolve();

  const scheduleBufferTick = () => {
    timeoutId = self.setTimeout(async () => {
      // esperamos até que o lote anterior seja totalmente processado para que os eventos sejam processados em ordem
      await processing;

      if (events.length > 0) {
        processing = Promise.resolve(cb(events));
      }

      timeoutId = undefined;
      events = [];
    }, timeInMs);
  };

  return (...args: T) => {
    events.push(args);

    if (!timeoutId) {
      scheduleBufferTick();
    }
  };
}
