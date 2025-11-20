import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import { capitalize } from '@/utils';

import styles from './style.module.scss';

type ButtonProps = {
  size?: 'large' | 'medium' | 'small';
  kind?: '3d' | 'flat';
  color?: 'light' | 'blue' | 'green' | 'red';
  icon?: boolean;
} & ComponentPropsWithRef<'button'>;

function Button({
  size = 'large',
  kind = '3d',
  color = 'blue',
  icon = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const cl = clsx(
    styles.button,
    styles[`button${capitalize(size)}`],
    styles[`button${capitalize(kind)}`],
    styles[`button${capitalize(color)}`],
    icon && styles.buttonIcon,
    className
  );

  return (
    <button className={cl} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  );
}

export { Button };
