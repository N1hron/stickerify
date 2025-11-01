import styles from './style.module.scss';

import clsx from 'clsx';

type DividerProps = {
  className?: string;
  vertical?: boolean;
};

export function Divider({ vertical, className }: DividerProps) {
  const cl = clsx(styles.divider, vertical && styles.dividerVertical, className);

  return <div className={cl} />;
}
