import { useAppSelector } from '@/store/hooks';

import { Table } from '../ui';
import { UploaderFile } from './UploaderFile';
import { selectUploaderItems } from '@/store/slices/uploader/index';

import styles from './style.module.scss';

export function UploaderFileTable() {
  const items = useAppSelector(selectUploaderItems);

  if (!items.length) return null;
  return (
    <Table className={styles.fileTable}>
      <Table.Header>
        <Table.Row>
          <Table.EmptyCell />
          <Table.Head>№</Table.Head>
          <Table.Head grow>Name</Table.Head>
          <Table.Head>Ext</Table.Head>
          <Table.Head>Size</Table.Head>
          <Table.EmptyCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item, i) => (
          <UploaderFile key={item.id} i={i} item={item} />
        ))}
      </Table.Body>
    </Table>
  );
}
