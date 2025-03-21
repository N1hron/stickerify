import { useAppSelector } from '../../store/hooks';
import { selectAllFiles } from '../../store/slices/files';
import { FileListHeader } from './FileListHeader';
import { FileListItem } from './FileListItem';
import { UploadIcon } from '../icons';

import styles from './style.module.scss';

function FileList() {
    const files = useAppSelector(selectAllFiles);
    const filesEmpty = files.length === 0;

    return (
        <div className={styles.fileList}>
            {!filesEmpty && <FileListHeader />}
            <ul className={styles.list}>
                {files.map((fileData, i) => (
                    <FileListItem key={fileData.id} index={i} fileData={fileData} />
                ))}
            </ul>
            {filesEmpty && <UploadIcon className={styles.icon} aria-hidden />}
        </div>
    );
}

export { FileList };
