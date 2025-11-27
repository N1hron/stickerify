import type { ComponentProps, ComponentPropsWithRef, ReactNode } from 'react';

import { Button } from '../button/Button';
import { TableCell } from './TableCell';

import styles from './style.module.scss';

type TableButtonCellProps = {
  children?: ReactNode;
} & ComponentPropsWithRef<typeof TableCell> &
  Pick<ComponentProps<typeof Button>, 'color' | 'icon' | 'title' | 'disabled' | 'onClick'>;

export function TableButtonCell({
  children,
  color,
  icon,
  title,
  disabled,
  onClick,
  ...props
}: TableButtonCellProps) {
  return (
    <TableCell slim colorless {...props}>
      <Button
        className={styles.button}
        size='medium'
        kind='3d'
        square
        color={color}
        icon={icon}
        title={title}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </TableCell>
  );
}
