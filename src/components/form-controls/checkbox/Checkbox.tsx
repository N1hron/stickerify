import { useId } from 'react';

import { Label } from '../../form-controls/label/Label';
import { CheckIcon } from '../../icons';

import styles from './style.module.scss';

type CheckboxProps = {
    label: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
};

function Checkbox({ label, checked = false, disabled, onChange }: CheckboxProps) {
    const inputId = useId();

    const handleChange = onChange
        ? (event: React.ChangeEvent<HTMLInputElement>) => {
              onChange(event.target.checked);
          }
        : undefined;

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
                <CheckIcon className={styles.icon} aria-hidden />
            </div>
            <Label className={styles.label} htmlFor={inputId}>
                {label}
            </Label>
        </div>
    );
}

export { Checkbox };
