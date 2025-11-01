import clsx from 'clsx';
import { useId, type ComponentPropsWithRef } from 'react';

import CheckIcon from '@/assets/icons/check.svg?react';

import styles from './style.module.scss';

type CheckboxProps = ComponentPropsWithRef<'div'> & {
  value: boolean;
  setValue: (value: boolean) => void;
  label: string;
  hideLabel?: string;
  disabled?: boolean;
};

export function Checkbox({
  value,
  setValue,
  label,
  hideLabel,
  disabled,
  className,
}: CheckboxProps) {
  const inputId = useId();
  const cl = clsx(styles.checkbox, className);

  function handleChange() {
    setValue(!value);
  }

  return (
    <div className={cl}>
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          className={styles.input}
          type='checkbox'
          checked={value}
          aria-label={hideLabel ? label : undefined}
          disabled={disabled}
          onChange={handleChange}
        />
        <CheckIcon className={styles.icon} aria-hidden />
      </div>

      {!hideLabel && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
    </div>
  );
}
