import { Table } from '../ui';
import { UploaderFileTableBody } from './UploaderFileTableBody';
import { useAppSelector } from '@/store/hooks';
import { selectShowDuration } from '@/store/slices/uploader';

import styles from './style.module.scss';

export function UploaderFileTable() {
  const showDuration = useAppSelector(selectShowDuration);

  return (
    <Table className={styles.fileTable}>
      <Table.Header>
        <Table.Row>
          <Table.EmptyCell colorless />
          <Table.Head grow>Name</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Ext</Table.Head>
          <Table.Head>Size</Table.Head>
          {showDuration && <Table.Head>Duration</Table.Head>}
          <Table.ButtonCell color='green' colSpan={2}>
            Run all
          </Table.ButtonCell>
        </Table.Row>
      </Table.Header>

      <UploaderFileTableBody />
    </Table>
  );
}
