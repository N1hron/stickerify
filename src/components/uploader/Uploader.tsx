import { Card } from '../ui';
import { UploaderFileTable } from './UploaderFileTable';
import { UploaderDroparea } from './UploaderDroparea';
import { UploaderAddFiles } from './UploaderAddFiles';
import { UploaderFileCount } from './UploaderFileCount';

import styles from './style.module.scss';

export function Uploader() {
  return (
    <Card className={styles.uploader}>
      <UploaderFileTable />

      <div className={styles.dropareaWrapper}>
        <UploaderDroparea />
        <UploaderAddFiles />
        <UploaderFileCount />
      </div>
    </Card>
  );
}
