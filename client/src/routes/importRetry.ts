const importRetry = (
    fn: () => Promise<{
        default: React.ComponentType<any>;
      }>,
    retriesLeft = 100,
    interval = 1000,
  ) => new Promise<{
        default: React.ComponentType<any>;
      }>((resolve, reject) => {
        fn()
          .then(resolve)
          .catch((error: any) => {
            if (error.toString().indexOf('ChunkLoadError') > -1) {
              // eslint-disable-next-line no-console
              console.log('[ChunkLoadError] Reloading due to error');
              window.location.reload();
            } else {
              setTimeout(() => {
                if (retriesLeft === 1) {
                  reject(error);
                  return;
                }
  
                importRetry(fn, retriesLeft - 1, interval).then(resolve, reject);
              }, interval);
            }
          });
      });
  
  export default importRetry;
  