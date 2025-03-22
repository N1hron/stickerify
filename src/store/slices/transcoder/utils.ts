import { nanoid } from '@reduxjs/toolkit';

import { FileData } from '../../../types';

export function prepareFileData(files: File[]) {
    return {
        payload: files.map<FileData>((file) => {
            const ext = file.name.match(/\.[^.]+$/)?.[0] || '';
            const name = file.name.replace(ext, '');

            return {
                id: nanoid(),
                input: { name, ext, size: file.size, url: URL.createObjectURL(file) },
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
