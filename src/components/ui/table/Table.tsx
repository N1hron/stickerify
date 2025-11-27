import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import { TableHeader } from './TableHeader';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { TableEmptyCell } from './TableEmptyCell';
import { TableButtonCell } from './TableButtonCell';

import styles from './style.module.scss';

type TableProps = ComponentPropsWithRef<'table'>;

function Table({ className, ...props }: TableProps) {
  const cl = clsx(styles.table, className);

  return <table className={cl} {...props} />;
}

Table.Header = TableHeader;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Row = TableRow;
Table.EmptyCell = TableEmptyCell;
Table.ButtonCell = TableButtonCell;

export { Table };
