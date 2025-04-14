import { Card, FileInput, Button, Divider } from '@ui';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    addFiles,
    removeSelectedFiles,
    selectAllowAdd,
    selectAllowDownload,
    selectAllowRemove,
    selectAllowTranscode,
    selectDownloadableFiles,
    selectFilesAmount,
    selectTranscoderStatus,
    transcodeSelectedFiles,
} from '@slices/transcoder';
import { downloadFile, downloadZipFile } from '@utils';
import { FILE_ACCEPT, FILE_LIMIT } from '@config';

import styles from './style.module.scss';

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
    const filesAmount = useAppSelector(selectFilesAmount);

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <div className={styles.addFiles}>
            <div className={styles.fileCount}>
                <span>
                    {filesAmount} / {FILE_LIMIT}
                </span>
            </div>
            <FileInput
                label='Add'
                accept={FILE_ACCEPT}
                disabled={!allowAdd}
                mini
                onChange={handleFilesChange}
            />
            <Divider vertical />
        </div>
    );
}

function DownloadFiles() {
    const allowDownload = useAppSelector(selectAllowDownload);
    const downloadableFiles = useAppSelector(selectDownloadableFiles);

    function handleDownloadClick() {
        if (downloadableFiles.length > 1) {
            const files = downloadableFiles.map((file) => ({
                name: `${file.output.name}.${file.output.ext}`,
                url: file.output.url,
            }));
            downloadZipFile(files, 'stickers.zip');
        } else if (downloadableFiles.length === 1) {
            const file = downloadableFiles[0];
            const url = file.output.url;
            const name = `${file.output.name}.${file.output.ext}`;

            downloadFile(url, name);
        }
    }

    return (
        <Button color='success' mini disabled={!allowDownload} onClick={handleDownloadClick}>
            Download
        </Button>
    );
}

export { TranscoderFooter };
