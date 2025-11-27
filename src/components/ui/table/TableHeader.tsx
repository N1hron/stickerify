import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import styles from './style.module.scss';

type TableHeaderProps = ComponentPropsWithRef<'thead'>;

export function TableHeader({ className, ...props }: TableHeaderProps) {
  const cl = clsx(styles.header, className);

  return <thead className={cl} {...props} />;
}
