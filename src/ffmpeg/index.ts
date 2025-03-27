import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

import { FileInput, FileOutput, OutputSettings } from '@/types';
import { createCommand, getOutputExt } from './utils';

const ffmpeg = new FFmpeg();
const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm';

async function load() {
    ffmpeg.on('log', ({ message }) => {
        console.log(message);
    });

    return ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
}

async function transcode(
    fileInput: FileInput,
    settings: OutputSettings
): Promise<Omit<FileOutput, 'name'>> {
    const outputExt = getOutputExt(settings.stickerMotionType);
    const inputUrl = fileInput.url;
    const inputName = `${fileInput.name}.${fileInput.ext}`;
    const outputName = `${fileInput.name}.${outputExt}`;

    const command = createCommand(inputName, outputName, settings);
    await ffmpeg.writeFile(inputName, await fetchFile(inputUrl));

    const code = await ffmpeg.exec(command);
    if (code !== 0) {
        throw new Error(`Could not trancode ${inputName}`);
    }

    const outputFile = await ffmpeg.readFile(outputName);
    const blob = new Blob([outputFile]);
    const outputUrl = URL.createObjectURL(blob);

    return {
        url: outputUrl,
        ext: outputExt,
        size: blob.size,
    };
}

export { load, transcode };
