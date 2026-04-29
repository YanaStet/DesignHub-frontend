import { lazy } from 'react';

type RetryOptions = {
  maxRetries?: number;
  delay?: number;
};

const RELOAD_KEY = 'lazy_module_reload';

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
          // Clear reload flag on successful import
          sessionStorage.removeItem(RELOAD_KEY);
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
              // Only reload once to prevent infinite loop
              const hasReloaded = sessionStorage.getItem(RELOAD_KEY);
              if (!hasReloaded) {
                sessionStorage.setItem(RELOAD_KEY, 'true');
                console.log('All retry attempts failed, reloading page...');
                window.location.reload();
                return;
              }
            }
            reject(error);
          }
        }
      };

      tryImport();
    });
  });
}
