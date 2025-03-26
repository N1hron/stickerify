import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectIsDefaultSettings, restoreDefaultSettings } from '@slices/output-settings';
import { Button } from '@components/ui';

function RestoreDefaults() {
    const dispatch = useAppDispatch();
    const isDefaultSettings = useAppSelector(selectIsDefaultSettings);

    function handleRestoreDefaultsClick() {
        dispatch(restoreDefaultSettings());
    }

    return (
        <Button color='accent' onClick={handleRestoreDefaultsClick} disabled={isDefaultSettings}>
            Restore defaults
        </Button>
    );
}

export { RestoreDefaults };
