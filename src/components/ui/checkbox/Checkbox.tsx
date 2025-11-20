import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import { Button } from '../button/Button';
import CheckIcon from '@/assets/icons/check.svg?react';

import styles from './style.module.scss';

type CheckboxProps = Omit<ComponentPropsWithRef<'button'>, 'color' | 'value'> & {
  value: boolean;
  setValue: (value: boolean) => void;
};

export function Checkbox({ value, setValue, className, ...props }: CheckboxProps) {
  const cl = clsx(styles.checkbox, className);
  const color = value ? 'blue' : 'light';

  function handleClick() {
    setValue(!value);
  }

  return (
    <Button
      className={cl}
      size='small'
      icon
      color={color}
      aria-checked={value}
      onClick={handleClick}
      {...props}
    >
      <CheckIcon className={styles.icon} aria-hidden />
    </Button>
  );
}
