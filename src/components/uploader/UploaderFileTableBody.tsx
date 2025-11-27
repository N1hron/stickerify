import { Table } from '../ui';
import { useAppSelector } from '@/store/hooks';
import { selectUploaderItems } from '@/store/slices/uploader';
import { UploaderFileTableRow } from './UploaderFileTableRow';

import styles from './style.module.scss';

export function UploaderFileTableBody() {
  const items = useAppSelector(selectUploaderItems);

  return (
    <Table.Body className={styles.fileTableBody}>
      {items.map((item) => (
        <UploaderFileTableRow key={item.signature} item={item} />
      ))}
    </Table.Body>
  );
}
