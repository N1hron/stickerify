import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSetting, setSetting } from '@slices/settings';
import { Checkbox, SpinButton } from '@ui';
import { Settings } from '@types';

type SettingListItemProps<S extends keyof Settings> = {
    name: S;
    label: string;
    value?: Settings[S];
    disabled?: boolean;
} & (Settings[S] extends string ? { options: Settings[S][] } : { options?: never });

function SettingListItem<S extends keyof Settings>({
    name,
    label,
    disabled,
    options,
}: SettingListItemProps<S>) {
    const dispatch = useAppDispatch();
    const currentValue = useAppSelector(selectSetting(name));

    function handleChange(v: typeof currentValue) {
        dispatch(setSetting([name, v]));
    }

    function renderInput() {
        if (!options && typeof currentValue === 'boolean') {
            return (
                <Checkbox
                    label={label}
                    checked={currentValue}
                    disabled={disabled}
                    onChange={handleChange as (v: boolean) => void}
                />
            );
        } else if (options && typeof currentValue === 'string') {
            return (
                <SpinButton
                    label={label}
                    options={options}
                    value={currentValue}
                    disabled={disabled}
                    onChange={handleChange}
                />
            );
        }
    }

    return <li>{renderInput()}</li>;
}

export { SettingListItem };
