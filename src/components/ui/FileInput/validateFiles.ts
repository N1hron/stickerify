import mimeTypes from '../../../data/mimeTypes.json';

function validateFiles(
    files: File[],
    accept: string
): [validFiles: File[], invalidFiles: File[]] {
    if (!accept) return [files, []];

    const acceptRegExp = regExpFromAccept(accept);

    const validFiles = [];
    const invalidFiles = [];

    for (let file of files) {
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
        let regexpPart = mimeTypeFromFileExtension(part);
        regexpPart = regexpPart.replace('/', '\\/');
        regexpPart = regexpPart.replace('*', '.+');
        regexpPart = `^${regexpPart}$`;

        return regexpPart;
    });
    const regexpString = regexpParts.join('|');

    return new RegExp(regexpString);
}

function mimeTypeFromFileExtension(fileExtension: string) {
    if (/\..+/.test(fileExtension) && fileExtension in mimeTypes) {
        return (<Record<string, string>>mimeTypes)[fileExtension];
    }
    return fileExtension;
}

export { validateFiles };
