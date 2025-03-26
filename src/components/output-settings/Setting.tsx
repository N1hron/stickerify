import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting, setSetting } from '../../store/slices/output-settings';
import { OutputSettings } from '../../types';
import { Checkbox, SpinButton } from '../ui';

type SettingProps<S extends keyof OutputSettings> = {
    name: S;
    label: string;
    value?: OutputSettings[S];
} & (OutputSettings[S] extends string ? { options: OutputSettings[S][] } : { options?: never });

function Setting<S extends keyof OutputSettings>({ name, label, options }: SettingProps<S>) {
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
                onChange={handleChange as (v: boolean) => void}
            />
        );
    } else if (options && typeof currentValue === 'string') {
        return (
            <SpinButton
                label={label}
                options={options}
                value={currentValue}
                onChange={handleChange}
            />
        );
    }
}

export { Setting };
