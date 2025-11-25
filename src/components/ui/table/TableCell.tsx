import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './style.module.scss';

type TableCellProps = {
  children?: ReactNode;
  ellipsis?: boolean;
  grow?: boolean;
  start?: boolean;
  colorless?: boolean;
  slim?: boolean;
};

export function TableCell({ children, ellipsis, grow, start, colorless, slim }: TableCellProps) {
  const cl = clsx(
    styles.cell,
    grow && styles.grow,
    start && styles.start,
    colorless && styles.colorless,
    slim && styles.slim
  );

  return (
    <td className={cl}>
      {ellipsis ? (
        <div className={styles.ellipsis}>
          <div className={styles.ellipsisContent}>{children}</div>
        </div>
      ) : (
        children
      )}
    </td>
  );
}
