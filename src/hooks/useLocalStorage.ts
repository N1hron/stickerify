import { useEffect, useState, useCallback } from 'react';

function useLocalStorage(key: string) {
    const [value, setValue] = useState<unknown>(() => {
        const valueLS = localStorage.getItem(key);
        if (valueLS) {
            try {
                const value: unknown = JSON.parse(valueLS);
                return value;
            } catch {
                return null;
            }
        }

        return null;
    });

    useEffect(() => {
        if (value === null) {
            localStorage.removeItem(key);
        } else {
            try {
                const jsonValue = JSON.stringify(value);
                localStorage.setItem(key, jsonValue);
            } catch {
                setValue(null);
            }
        }
    }, [value]);

    const removeValue = useCallback(() => {
        setValue(null);
    }, []);

    return [value, setValue, removeValue] as const;
}

export { useLocalStorage };
