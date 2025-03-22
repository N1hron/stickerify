import { defaultState } from './';
import { isSettings, safeParseJson } from '../../../utils';

export function getInitialState(): typeof defaultState {
    const settingsLS = localStorage.getItem('settings');
    const rememberLS = localStorage.getItem('remember');

    const settings = safeParseJson(settingsLS);
    const remember = safeParseJson(rememberLS);

    if (remember === true && isSettings(settings)) {
        return { items: settings, remember };
    } else if (remember === false) {
        return { ...defaultState, remember };
    }

    return defaultState;
}
