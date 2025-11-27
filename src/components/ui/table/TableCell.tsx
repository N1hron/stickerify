import clsx from 'clsx';
import type { ComponentPropsWithRef, ReactNode } from 'react';

import styles from './style.module.scss';

type TableCellProps = {
  children?: ReactNode;
  ellipsis?: boolean;
  grow?: boolean;
  start?: boolean;
  colorless?: boolean;
  slim?: boolean;
  colSpan?: number;
} & ComponentPropsWithRef<'td'>;

export function TableCell({
  children,
  ellipsis,
  grow,
  start,
  colorless,
  slim,
  ...props
}: TableCellProps) {
  const cl = clsx(
    styles.cell,
    grow && styles.grow,
    start && styles.start,
    colorless && styles.colorless,
    slim && styles.slim
  );

  return (
    <td className={cl} {...props}>
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
