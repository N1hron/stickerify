import { useEffect, useState, useCallback } from 'react';

import { safeStringify, safeParseJson } from '../utils';

function useLocalStorage(key: string) {
    const [value, setValue] = useState<unknown>(() => {
        const valueLS = localStorage.getItem(key);
        return safeParseJson(valueLS);
    });

    useEffect(() => {
        if (value === null) {
            localStorage.removeItem(key);
        } else {
            const valueString = safeStringify(value);

            if (valueString === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, valueString);
            }
        }
    }, [value]);

    const removeValue = useCallback(() => {
        setValue(null);
    }, []);

    return [value, setValue, removeValue] as const;
}

export { useLocalStorage };
