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

function TranscoderFooter() {
    const dispatch = useAppDispatch();

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const allowRemove = useAppSelector(selectAllowRemove);
    const allowTranscode = useAppSelector(selectAllowTranscode);
    const allowAdd = useAppSelector(selectAllowAdd);

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

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
                <FileInput label='Add' mini disabled={!allowAdd} onChange={handleFilesChange} />
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
                    <Download />
                </li>
            </menu>
        </Card>
    );
}

function Download() {
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
