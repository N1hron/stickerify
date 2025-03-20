import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsDefaultSettings } from '../../store/slices/settings';
import { restoreDefaultSettings } from '../../store/slices/settings';
import { Button } from '../ui';

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
