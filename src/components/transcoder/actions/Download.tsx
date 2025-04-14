import { useAppSelector } from '@store/hooks';
import { selectAllowDownload, selectDownloadableFiles } from '@slices/transcoder';
import { downloadFile, downloadZipFile } from '@utils';
import { Button } from '@ui';

function Download() {
    const allowDownload = useAppSelector(selectAllowDownload);
    const downloadableFiles = useAppSelector(selectDownloadableFiles);

    function handleDownloadClick() {
        if (!allowDownload) return;

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

export { Download };
