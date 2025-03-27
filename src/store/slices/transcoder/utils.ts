import { nanoid } from '@reduxjs/toolkit';

import { FileData } from '@types';

export function prepareFileData(files: File[]) {
    return {
        payload: files.map<FileData>((file) => {
            const id = nanoid();
            const ext = file.name.match(/\.[^.]+$/)?.[0].slice(1) || '';
            const name = file.name.replace(`.${ext}`, '');
            const size = file.size;
            const url = URL.createObjectURL(file);

            return {
                id,
                input: { name, ext, size, url },
                output: { name, ext: null, size: null, url: null },
                status: 'idle',
                isSelected: false,
            };
        }),
    };
}

export function revokeFileURLs(file: FileData) {
    URL.revokeObjectURL(file.input.url);
    if (file.output.url) URL.revokeObjectURL(file.output.url);
}
