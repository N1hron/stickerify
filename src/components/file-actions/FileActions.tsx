import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting } from '../../store/slices/settings';
import { addFiles, removeSelectedFiles, selectAllowRemove } from '../../store/slices/transcoder';
import { config } from '../../config';
import { Card, FileInput, Button } from '../ui';

import styles from './style.module.scss';

function FileActions() {
    const dispatch = useAppDispatch();

    const stickerMotion = useAppSelector(selectSetting('stickerMotion'));
    const accept = config.acceptValues[stickerMotion];
    const allowRemove = useAppSelector(selectAllowRemove);

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    function handleRemoveClick() {
        if (!allowRemove) return;
        dispatch(removeSelectedFiles());
    }

    return (
        <Card className={styles.fileActions} mini>
            <FileInput label='Add files' mini accept={accept} onChange={handleFilesChange} />
            <Button color='danger' mini onClick={handleRemoveClick} disabled={!allowRemove}>
                Remove
            </Button>
        </Card>
    );
}

export { FileActions };
