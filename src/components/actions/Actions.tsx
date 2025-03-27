import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSetting } from '@slices/output-settings';
import {
    addFiles,
    removeSelectedFiles,
    selectAllowDownload,
    selectAllowRemove,
    selectAllowTranscode,
    selectSelectedFiles,
    selectTranscoderStatus,
    transcodeSelectedFiles,
} from '@slices/transcoder';
import { Card, FileInput, Button, Divider } from '@components/ui';
import { config } from '@data';

import styles from './style.module.scss';
import { downloadFile } from '@/utils';

function Actions() {
    const dispatch = useAppDispatch();

    const selectedFiles = useAppSelector(selectSelectedFiles);
    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const stickerMotionType = useAppSelector(selectSetting('stickerMotionType'));
    const allowRemove = useAppSelector(selectAllowRemove);
    const allowTranscode = useAppSelector(selectAllowTranscode);
    const allowDownload = useAppSelector(selectAllowDownload);

    const accept = config.accept[stickerMotionType];

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    function handleRemoveClick() {
        if (allowRemove) {
            dispatch(removeSelectedFiles());
        }
    }

    function handleTrancodeClick() {
        if (allowTranscode) {
            dispatch(transcodeSelectedFiles());
        }
    }

    function handleDownloadClick() {
        if (allowDownload) {
            selectedFiles.forEach((file) => {
                const { name, ext, url } = file.output;
                if (name && ext && url) {
                    downloadFile(url, `${name}.${ext}`);
                }
            });
        }
    }

    if (!(transcoderStatus === 'ready' || transcoderStatus === 'transcoding')) return null;
    return (
        <Card className={styles.actions} mini>
            <div className={styles.group}>
                <FileInput
                    label='Add files'
                    mini
                    accept={accept}
                    onChange={handleFilesChange}
                    disabled={transcoderStatus !== 'ready'}
                />

                <Divider vertical />
            </div>
            <div className={styles.group}>
                <Divider vertical />

                <Button color='danger' mini onClick={handleRemoveClick} disabled={!allowRemove}>
                    Remove
                </Button>
                <Button mini onClick={handleTrancodeClick} disabled={!allowTranscode}>
                    Transcode
                </Button>
                <Button
                    mini
                    color='success'
                    onClick={handleDownloadClick}
                    disabled={!allowDownload}
                >
                    Download
                </Button>
            </div>
        </Card>
    );
}

export { Actions };
