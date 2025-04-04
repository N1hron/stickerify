import { AppMiddleware } from '@store';
import { isPayloadAction, safeStringify } from '@utils';

const rememberOutputSettings: AppMiddleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);
        const [slice, type] = action.type.split('/');

        if (slice === 'outputSettings') {
            const saveToLocalStorage = () => {
                const settingsLS = safeStringify(getState().outputSettings.items);
                if (settingsLS) {
                    localStorage.setItem('outputSettings', settingsLS);
                }
            };

            switch (type) {
                case 'setRememberSettings': {
                    next(action);

                    const remember = getState().outputSettings.remember;
                    localStorage.setItem('rememberOutputSettings', String(remember));

                    if (remember === true) {
                        saveToLocalStorage();
                    } else {
                        localStorage.removeItem('outputSettings');
                    }

                    break;
                }
                case 'setSetting':
                case 'restoreDefaultSettings': {
                    next(action);

                    const remember = getState().outputSettings.remember;
                    const rememberLS = localStorage.getItem('remember');

                    if (rememberLS === null) {
                        localStorage.setItem('rememberOutputSettings', String(remember));
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
        } else {
            next(action);
        }
    };

export { rememberOutputSettings };
