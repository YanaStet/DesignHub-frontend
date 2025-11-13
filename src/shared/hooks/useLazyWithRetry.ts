import { lazy } from 'react';

type RetryOptions = {
  maxRetries?: number;
  delay?: number;
};

export function useLazyWithRetry<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: RetryOptions = {},
) {
  const { maxRetries = 3, delay = 1000 } = options;

  return lazy(() => {
    return new Promise<{ default: T }>((resolve, reject) => {
      let retryCount = 0;

      const tryImport = async () => {
        try {
          const module = await importFunc();
          resolve(module);
        } catch (error) {
          console.error(
            `Failed to load module (attempt ${retryCount + 1}):`,
            error,
          );

          if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(() => {
              tryImport();
            }, delay * retryCount);
          } else {
            if (
              error instanceof TypeError &&
              error.message.includes(
                'Failed to fetch dynamically imported module',
              )
            ) {
              console.log('All retry attempts failed, reloading page...');
              window.location.reload();
            }
            reject(error);
          }
        }
      };

      tryImport();
    });
  });
}
