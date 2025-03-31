import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

import { TranscoderFileOutput, OutputSettings, TranscoderFile } from '@/types';
import { createCommand, getOutputExt } from './utils';

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
    settings: OutputSettings
): Promise<Omit<TranscoderFileOutput, 'name'>> {
    const id = file.id;
    const inputUrl = file.input.url;
    const inputExt = file.input.ext;
    const outputExt = getOutputExt(settings.stickerMotionType);
    const inputName = `file-${id}.${inputExt}`;
    const outputName = `file-${id}-out.${outputExt}`;

    const command = createCommand(inputName, outputName, settings);
    await ffmpeg.writeFile(inputName, await fetchFile(inputUrl));
    const code = await ffmpeg.exec(command);

    if (code !== 0) {
        throw new Error(`Could not trancode ${file.input.name}.${inputExt}, code: ${code}`);
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
