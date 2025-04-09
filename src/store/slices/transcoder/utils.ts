import { nanoid } from '@reduxjs/toolkit';

import { TranscoderFile } from '@types';

function prepareFiles(files: File[]) {
    return {
        payload: files.map<TranscoderFile>((file) => {
            const id = nanoid();
            const ext = file.name.match(/\.[^.]+$/)?.[0].slice(1) || '';
            const name = file.name.replace(`.${ext}`, '');
            const size = file.size;
            const url = URL.createObjectURL(file);

            return {
                id,
                input: { name, ext, size, url },
                output: { name, ext: null, size: null, url: null },
                status: 'ready',
                isSelected: false,
            };
        }),
    };
}

function findFile(files: TranscoderFile[], id: string) {
    return files.find((file) => file.id === id);
}

function revokeFileURLs(file: TranscoderFile) {
    URL.revokeObjectURL(file.input.url);
    if (file.output.url) URL.revokeObjectURL(file.output.url);
}

export { prepareFiles, findFile, revokeFileURLs };
