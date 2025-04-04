import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSetting, setSetting } from '@slices/output-settings';
import { Checkbox, SpinButton } from '@components/ui';
import { OutputSettings } from '@types';

type SettingProps<S extends keyof OutputSettings> = {
    name: S;
    label: string;
    value?: OutputSettings[S];
    disabled?: boolean;
} & (OutputSettings[S] extends string ? { options: OutputSettings[S][] } : { options?: never });

function Setting<S extends keyof OutputSettings>({
    name,
    label,
    disabled,
    options,
}: SettingProps<S>) {
    const dispatch = useAppDispatch();
    const currentValue = useAppSelector(selectSetting(name));

    function handleChange(v: typeof currentValue) {
        dispatch(setSetting([name, v]));
    }

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

export { Setting };
