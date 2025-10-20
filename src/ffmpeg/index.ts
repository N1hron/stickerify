import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

import { TranscoderFileOutput, Settings, TranscoderFile } from '@types';
import { createCommand } from './utils';

const ffmpeg = new FFmpeg();
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

async function load() {
    if (import.meta.env.DEV) {
        ffmpeg.on('log', ({ message }) => {
            console.log(message);
        });
    }

    return ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
}

async function transcode(
    file: TranscoderFile,
    settings: Settings
): Promise<Omit<TranscoderFileOutput, 'name'>> {
    const { command, writeName, readName, outputExt } = createCommand(file, settings);

    await ffmpeg.writeFile(writeName, await fetchFile(file.input.url));
    const statusCode = await ffmpeg.exec(command);

    if (statusCode !== 0) {
        throw new Error(
            `Could not trancode ${file.input.name}.${file.input.ext}, code: ${statusCode}`
        );
    }

    const outputFile = (await ffmpeg.readFile(readName)) as Uint8Array<ArrayBuffer> | string;
    await ffmpeg.deleteFile(writeName);
    await ffmpeg.deleteFile(readName);

    const outputBlob = new Blob([outputFile]);
    const outputUrl = URL.createObjectURL(outputBlob);
    const outputSize = outputBlob.size;

    return {
        url: outputUrl,
        ext: outputExt,
        size: outputSize,
    };
}

export { load, transcode };
