import type { ComponentProps, ReactNode } from 'react';

import { Button } from '../button/Button';
import { TableCell } from './TableCell';

import styles from './style.module.scss';

type TabelButtonCellProps = {
  children?: ReactNode;
} & Pick<ComponentProps<typeof Button>, 'color' | 'icon' | 'aria-label' | 'title' | 'onClick'>;

export function TabelButtonCell({ children, ...props }: TabelButtonCellProps) {
  return (
    <TableCell slim colorless>
      <Button className={styles.button} size='medium' kind='3d' square {...props}>
        {children}
      </Button>
    </TableCell>
  );
}
