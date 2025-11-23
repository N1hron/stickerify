import { ALL_FORMATS, BlobSource, Input } from 'mediabunny';

import { devLog, loadImage } from '@/utils';
import type { FileData } from '@/types';

export async function* generateFileData(
  files: FileList,
  existingFiles: FileData[]
): AsyncGenerator<FileData> {
  for (const file of files) {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) continue;

    if (
      existingFiles.find((ef) => {
        return ef.name === file.name && ef.type === file.type && ef.size === file.size;
      })
    ) {
      continue;
    }

    const base = {
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
    } satisfies Partial<FileData>;

    try {
      if (isVideo) {
        const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
        const duration = await input.computeDuration();
        const primaryVideoTrack = await input.getPrimaryVideoTrack();

        if (!primaryVideoTrack) continue;

        yield {
          ...base,
          width: primaryVideoTrack.codedWidth,
          height: primaryVideoTrack.codedHeight,
          duration,
        };
      }

      if (isImage) {
        const image = document.createElement('img');
        await loadImage(image, base.url);

        yield {
          ...base,
          width: image.naturalWidth,
          height: image.naturalHeight,
          duration: 0,
        };
      }
    } catch (err) {
      devLog('Failed to create converter file:', err);
    }
  }
}
