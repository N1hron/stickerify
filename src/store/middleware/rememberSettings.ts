import { AppMiddleware } from '..';
import { isPayloadAction, safeStringify } from '../../utils';

const rememberSettings: AppMiddleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        const [slice, type] = action.type.split('/');
        if (slice !== 'settings') return next(action);

        const saveToLocalStorage = () => {
            const settingsLS = safeStringify(getState().settings.items);
            if (settingsLS) {
                localStorage.setItem('settings', settingsLS);
            }
        };

        switch (type) {
            case 'setRememberSettings': {
                next(action);

                const remember = getState().settings.remember;

                localStorage.setItem('remember', String(remember));
                if (remember === true) {
                    saveToLocalStorage();
                } else {
                    localStorage.removeItem('settings');
                }

                break;
            }
            case 'setSetting':
            case 'restoreDefaultSettings': {
                next(action);

                const remember = getState().settings.remember;
                const rememberLS = localStorage.getItem('remember');

                if (rememberLS === null) {
                    localStorage.setItem('remember', String(remember));
                }

                if (remember) {
                    saveToLocalStorage();
                }

                break;
            }
            default: {
                next(action);
            }
        }
    };

export { rememberSettings };
