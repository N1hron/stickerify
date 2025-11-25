import clsx from 'clsx';

import styles from './style.module.scss';

type TableEmptyProps = {
  colorless?: boolean;
};

export function TableEmptyCell({ colorless }: TableEmptyProps) {
  const cl = clsx(styles.emptyCell, colorless && styles.colorless);

  return <td className={cl} aria-hidden />;
}
