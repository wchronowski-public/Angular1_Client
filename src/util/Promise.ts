export function setImmediateAsync<T>(fn: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      try {
        resolve(fn());
      } catch(e) {
        reject(e);
      }
    });
  });
}
