import { Card, FileInput, Button } from '@components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    addFiles,
    removeSelectedFiles,
    selectAllowAdd,
    selectAllowDownload,
    selectAllowRemove,
    selectAllowTranscode,
    selectDownloadableFiles,
    selectTranscoderStatus,
    transcodeSelectedFiles,
} from '@/store/slices/transcoder';
import { downloadFile } from '@/utils';

import styles from './style.module.scss';
import { selectSetting } from '@/store/slices/settings';
import { config } from '@/data';

function TranscoderFooter() {
    const dispatch = useAppDispatch();

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const allowRemove = useAppSelector(selectAllowRemove);
    const allowTranscode = useAppSelector(selectAllowTranscode);

    function handleRemoveClick() {
        dispatch(removeSelectedFiles());
    }

    function handleTranscodeClick() {
        dispatch(transcodeSelectedFiles());
    }

    if (!(transcoderStatus === 'ready' || transcoderStatus === 'transcoding')) return null;
    return (
        <Card className={styles.footer} mini>
            <div className={styles.footerGroup}>
                <AddFiles />
            </div>
            <menu className={styles.footerGroup}>
                <li>
                    <Button color='danger' mini disabled={!allowRemove} onClick={handleRemoveClick}>
                        Remove
                    </Button>
                </li>
                <li>
                    <Button mini disabled={!allowTranscode} onClick={handleTranscodeClick}>
                        Transcode
                    </Button>
                </li>
                <li>
                    <DownloadFiles />
                </li>
            </menu>
        </Card>
    );
}

function AddFiles() {
    const dispatch = useAppDispatch();
    const allowAdd = useAppSelector(selectAllowAdd);
    const stickerMotionType = useAppSelector(selectSetting('stickerMotionType'));
    const accept = config.accept[stickerMotionType];

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <FileInput
            label='Add'
            accept={accept}
            disabled={!allowAdd}
            mini
            onChange={handleFilesChange}
        />
    );
}

function DownloadFiles() {
    const allowDownload = useAppSelector(selectAllowDownload);
    const downloadableFiles = useAppSelector(selectDownloadableFiles);

    function handleDownloadClick() {
        downloadableFiles.forEach((file) => {
            const url = file.output.url;
            const name = `${file.output.name}.${file.output.ext}`;

            downloadFile(url, name);
        });
    }

    return (
        <Button color='success' mini disabled={!allowDownload} onClick={handleDownloadClick}>
            Download
        </Button>
    );
}

export { TranscoderFooter };
