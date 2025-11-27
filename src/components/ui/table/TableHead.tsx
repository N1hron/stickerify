import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import styles from './style.module.scss';

type TableHeadProps = {
  grow?: boolean;
} & ComponentPropsWithRef<'th'>;

export function TableHead({ grow, ...props }: TableHeadProps) {
  const cl = clsx(styles.head, grow && styles.grow);

  return <th className={cl} {...props} />;
}
