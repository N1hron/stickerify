import { useAppSelector } from '@/store/hooks';
import { selectUploaderItemsCount } from '@/store/slices/uploader/index';

import { config } from '@/config';

import styles from './style.module.scss';

export function UploaderFileCount() {
  const count = useAppSelector(selectUploaderItemsCount);

  return (
    <div className={styles.fileCount} aria-live='polite'>
      {count}/{config.maxFiles}
    </div>
  );
}
