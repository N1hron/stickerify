import { useAppSelector } from '../../store/hooks';
import { selectAllFiles } from '../../store/slices/files';
import { FileListHeader } from './FileListHeader';
import { FileListItem } from './FileListItem';

import styles from './style.module.scss';

function FileList() {
    const files = useAppSelector(selectAllFiles);

    if (files.length === 0) return null;
    return (
        <div className={styles.fileList}>
            <FileListHeader />
            <ul className={styles.list}>
                {files.map((fileData, i) => (
                    <FileListItem key={fileData.id} index={i} fileData={fileData} />
                ))}
            </ul>
        </div>
    );
}

export { FileList };
