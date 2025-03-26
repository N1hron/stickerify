import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectRememberSettings, setRememberSettings } from '@slices/output-settings';
import { Checkbox } from '@components/ui';

function RememberChoice() {
    const dispatch = useAppDispatch();
    const rememberSettings = useAppSelector(selectRememberSettings);

    function handleChange(value: boolean) {
        dispatch(setRememberSettings(value));
    }

    return <Checkbox label='Remember choice' checked={rememberSettings} onChange={handleChange} />;
}

export { RememberChoice };
