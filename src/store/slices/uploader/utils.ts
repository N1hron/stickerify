import { ALL_FORMATS, BlobSource, Input } from 'mediabunny';

import { devLog, loadImage, splitFileName } from '@/utils';
import { config } from '@/config';
import type { FileData, UploaderItem } from '@/types';

export async function* generateFileData(
  files: FileList,
  uploaderItems: UploaderItem[]
): AsyncGenerator<FileData> {
  let spaceLeft = config.maxFiles - uploaderItems.length;

  for (const file of files) {
    if (spaceLeft <= 0) break;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) continue;

    const [baseName, extension] = splitFileName(file.name);

    if (
      uploaderItems.find(({ fileData }) => {
        return (
          fileData.baseName === baseName &&
          fileData.extension === extension &&
          fileData.type === file.type &&
          fileData.size === file.size
        );
      })
    ) {
      continue;
    }

    const base = {
      baseName,
      extension,
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

        spaceLeft--;
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

        spaceLeft--;
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
