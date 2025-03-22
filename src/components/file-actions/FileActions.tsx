import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting } from '../../store/slices/settings';
import {
    addFiles,
    removeSelectedFiles,
    selectAllowRemove,
    selectTranscoderStatus,
} from '../../store/slices/transcoder';
import { config } from '../../config';
import { Card, FileInput, Button } from '../ui';

import styles from './style.module.scss';

function FileActions() {
    const dispatch = useAppDispatch();

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
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

    if (transcoderStatus !== 'ready') return null;
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
