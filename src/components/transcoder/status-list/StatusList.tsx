import { useAppSelector } from '@store/hooks';
import { selectAllFiles } from '@slices/transcoder';
import { StatusListItem } from './StatusListItem';

import styles from './style.module.scss';

function StatusList() {
    const files = useAppSelector(selectAllFiles);

    return (
        <ul className={styles.statusList}>
            {files.map((file) => (
                <StatusListItem key={file.id} status={file.status} />
            ))}
        </ul>
    );
}

export { StatusList };
