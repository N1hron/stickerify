import { AppMiddleware } from '@store';
import { isPayloadAction, safeStringify } from '@utils';

const rememberSettings: AppMiddleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        const [slice, type] = action.type.split('/');
        const saveSettings = () => {
            const settingsJSON = safeStringify(getState().settings.items);

            if (settingsJSON) {
                localStorage.setItem('settings', settingsJSON);
            }
        };

        if (slice === 'settings') {
            switch (type) {
                case 'setRememberSettings': {
                    next(action);

                    const remember = getState().settings.remember;

                    if (remember === true) {
                        saveSettings();
                    } else {
                        localStorage.removeItem('settings');
                    }
                    localStorage.setItem('rememberSettings', String(remember));

                    break;
                }
                case 'setSetting':
                case 'restoreDefaultSettings': {
                    next(action);

                    const remember = getState().settings.remember;
                    const rememberLS = localStorage.getItem('rememberSettings');

                    if (remember) {
                        saveSettings();
                    }

                    if (rememberLS === null) {
                        localStorage.setItem('rememberSettings', String(remember));
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

export { rememberSettings };
