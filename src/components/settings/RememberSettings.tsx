import { Checkbox } from '@ui';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectRememberSettings, setRememberSettings } from '@slices/settings';

function RememberSettings() {
    const dispatch = useAppDispatch();
    const rememberSettings = useAppSelector(selectRememberSettings);

    function handleChange(value: boolean) {
        dispatch(setRememberSettings(value));
    }

    return <Checkbox label='Remember choice' checked={rememberSettings} onChange={handleChange} />;
}

export { RememberSettings };
