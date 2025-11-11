import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import styles from './style.module.scss';

export type CardTitleProps = ComponentPropsWithRef<'h2'>;

export function CardTitle({ className, children }: CardTitleProps) {
  const cl = clsx(styles.title, className);

  return <h2 className={cl}>{children}</h2>;
}
