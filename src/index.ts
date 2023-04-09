import { useCallback, useEffect, useState } from 'react';

type useLocalStorageFn = (key: string, initialValue?: string) => [string | null, (newValue: string) => void, () => void];

const useLocalStorage: useLocalStorageFn = (key, initialValue) => {
  const setLocalStorage = useCallback((newValue: string) => {
    localStorage.setItem(key, newValue);
    window.dispatchEvent(
      new StorageEvent('storage', {
        storageArea: localStorage,
        newValue,
        key,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [storage, setStorage] = useState(() => {
    if (typeof initialValue === 'string') {
      setLocalStorage(initialValue);
      return initialValue;
    }
    return localStorage.getItem(key);
  });

  const updateState = useCallback(
    (newValue: string) => {
      setLocalStorage(newValue);
      setStorage(newValue);
    },
    [setLocalStorage, setStorage],
  );

  const clearKey = useCallback(() => {
    localStorage.removeItem(key);
    window.dispatchEvent(
      new StorageEvent('storage', {
        storageArea: localStorage,
        newValue: null,
        key,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cb = useCallback(
    function (event: StorageEvent) {
      if (event.storageArea === localStorage && event.key === key) {
        setStorage(event.newValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    window.addEventListener('storage', cb);

    return () => {
      window.removeEventListener('storage', cb);
    };
  }, [cb]);

  return [storage, updateState, clearKey];
};

export default useLocalStorage;
