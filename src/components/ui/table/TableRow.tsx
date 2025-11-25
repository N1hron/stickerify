import type { ReactNode } from 'react';

import styles from './style.module.scss';

type TableRowProps = {
  children?: ReactNode;
};

export function TableRow({ children }: TableRowProps) {
  return <tr className={styles.row}>{children}</tr>;
}
