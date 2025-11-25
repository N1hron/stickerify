import type { ReactNode } from 'react';

import styles from './style.module.scss';

type TableBodyProps = {
  children?: ReactNode;
};

export function TableBody({ children }: TableBodyProps) {
  return <tbody className={styles.body}>{children}</tbody>;
}
