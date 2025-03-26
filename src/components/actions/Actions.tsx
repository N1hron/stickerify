import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSetting } from '@slices/output-settings';
import {
    addFiles,
    removeSelectedFiles,
    selectAllowRemove,
    selectTranscoderStatus,
} from '@slices/transcoder';
import { Card, FileInput, Button } from '@components/ui';
import { config } from '@data';

import styles from './style.module.scss';

function Actions() {
    const dispatch = useAppDispatch();

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const stickerMotionType = useAppSelector(selectSetting('stickerMotionType'));
    const accept = config.accept[stickerMotionType];
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
        <Card className={styles.actions} mini>
            <FileInput label='Add files' mini accept={accept} onChange={handleFilesChange} />
            <Button color='danger' mini onClick={handleRemoveClick} disabled={!allowRemove}>
                Remove
            </Button>
        </Card>
    );
}

export { Actions };
