import type { ReactNode } from 'react';

import styles from './style.module.scss';

type TableHeaderProps = {
  children?: ReactNode;
};

export function TableHeader({ children }: TableHeaderProps) {
  return <thead className={styles.header}>{children}</thead>;
}
