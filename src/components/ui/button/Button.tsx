import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import styles from './style.module.scss';

type ButtonProps = {
  mini?: boolean;
  icon?: boolean;
  pressed?: boolean;
} & ComponentPropsWithRef<'button'>;

function Button({ mini, icon, pressed, className, children, ...props }: ButtonProps) {
  const cl = clsx(
    styles.button,
    mini && styles.buttonMini,
    icon && styles.buttonIcon,
    pressed && styles.buttonPressed,
    className
  );

  return (
    <button className={cl} {...props}>
      <span className={styles.content}>{children}</span>
    </button>
  );
}

export { Button };
