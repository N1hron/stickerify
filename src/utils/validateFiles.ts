import { mimeTypes } from '@data';

function validateFiles(files: File[], accept: string): [validFiles: File[], invalidFiles: File[]] {
    if (!accept) return [files, []];

    const acceptRegExp = regExpFromAccept(accept);

    const validFiles = [];
    const invalidFiles = [];

    for (const file of files) {
        if (acceptRegExp.test(file.type)) {
            validFiles.push(file);
            continue;
        }

        invalidFiles.push(file);
    }

    return [validFiles, invalidFiles];
}

function regExpFromAccept(accept: string): RegExp {
    if (!accept) return new RegExp(accept);

    const acceptParts = accept.split(',').map((part) => part.trim());
    const regexpParts = acceptParts.map((part) => {
        let res = part.startsWith('.') ? mimeTypeFromFileExtension(part) : part;

        res = res.replace('/', '\\/');
        res = res.replace('*', '.+');
        res = `^${res}$`;

        return res;
    });
    const regexpString = regexpParts.join('|');

    return new RegExp(regexpString);
}

function mimeTypeFromFileExtension(fileExtension: string) {
    if (fileExtension in mimeTypes) {
        return mimeTypes[fileExtension];
    }
    return fileExtension;
}

export { validateFiles };
