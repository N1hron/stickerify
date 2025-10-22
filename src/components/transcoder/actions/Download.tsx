import { Button } from '@ui';
import { DownloadIcon } from '@/components/icons';
import { useAppSelector } from '@store/hooks';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { selectAllowDownload, selectDownloadableFiles } from '@slices/transcoder';
import { downloadFile, downloadZipFile } from '@utils';

function Download() {
    const allowDownload = useAppSelector(selectAllowDownload);
    const downloadableFiles = useAppSelector(selectDownloadableFiles);
    const showIcon = useMediaQuery('(max-width: 23em)');

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
            {showIcon ? <DownloadIcon /> : 'Download'}
        </Button>
    );
}

export { Download };
