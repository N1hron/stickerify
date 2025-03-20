import { useAppSelector } from '../../store/hooks';
import { selectIsFilesEmpty } from '../../store/slices/files';
import { UploadIcon } from '../icons';

import styles from './style.module.scss';

function DropArea() {
    const showIcon = useAppSelector(selectIsFilesEmpty);

    return (
        <div className={styles.dropArea}>
            {showIcon && <UploadIcon className={styles.icon} aria-hidden />}
        </div>
    );
}

export { DropArea };
