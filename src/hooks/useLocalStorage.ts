import { useEffect, useState, useCallback } from 'react';

function useLocalStorage(key: string, defaultValue?: unknown) {
    const [value, setValue] = useState<unknown>(() => {
        const localStorageValue = localStorage.getItem(key);
        return localStorageValue ? JSON.parse(localStorageValue) : defaultValue;
    });

    useEffect(() => {
        if (value === undefined) return localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    const removeValue = useCallback(() => {
        setValue(undefined);
    }, []);

    return [value, setValue, removeValue] as const;
}

export { useLocalStorage };
