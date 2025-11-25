import type { ReactNode } from 'react';

import styles from './style.module.scss';
import clsx from 'clsx';

type TableHeadProps = {
  children?: ReactNode;
  grow?: boolean;
};

export function TableHead({ children, grow }: TableHeadProps) {
  const cl = clsx(styles.head, grow && styles.grow);

  return <th className={cl}>{children}</th>;
}
