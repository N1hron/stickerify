import { useId } from 'react';
import clsx from 'clsx';

import { Label } from '@components/ui';
import { CheckboxIcon } from '@components/icons';

import styles from './style.module.scss';

type CheckboxProps = {
    label: string;
    hideLabel?: boolean;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
};

function Checkbox({ label, hideLabel, checked, disabled, onChange }: CheckboxProps) {
    const inputId = useId();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (onChange) {
            onChange(event.target.checked);
        }
    }

    return (
        <div className={styles.checkbox}>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    id={inputId}
                    type='checkbox'
                    onChange={handleChange}
                    checked={checked}
                    disabled={disabled}
                />
                <CheckboxIcon className={styles.icon} aria-hidden />
            </div>
            <Label className={clsx(styles.label, hideLabel && 'visually-hidden')} htmlFor={inputId}>
                {label}
            </Label>
        </div>
    );
}

export { Checkbox };
