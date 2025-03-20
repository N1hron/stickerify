import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting } from '../../store/slices/settings';
import { addFiles } from '../../store/slices/files';
import { config } from '../../config';
import { Card, FileInput } from '../ui';

import styles from './style.module.scss';

function FileActions() {
    const dispatch = useAppDispatch();

    const stickerMotion = useAppSelector(selectSetting('stickerMotion'));
    const accept = config.acceptValues[stickerMotion];

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <Card className={styles.fileActions} mini>
            <FileInput label='Add files' mini accept={accept} onChange={handleFilesChange} />
        </Card>
    );
}

export { FileActions };
