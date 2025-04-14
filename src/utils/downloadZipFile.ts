import JSZip from 'jszip';

import { downloadFile } from './downloadFile';

async function downloadZipFile(files: Array<{ name: string; url: string }>, name: string) {
    const zip = new JSZip();

    for (const file of files) {
        const { name, url } = file;

        try {
            const blob = await fetch(url).then((res) => res.blob());
            zip.file(name, blob);
        } catch {
            throw new Error(`Could not add file ${name} to zip file`);
        }
    }

    return zip.generateAsync({ type: 'base64' }).then((base64) => {
        const url = 'data:application/zip;base64,' + base64;
        return downloadFile(url, name);
    });
}

export { downloadZipFile };
