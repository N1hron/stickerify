import { ALL_FORMATS, BlobSource, Input } from 'mediabunny';

export function createFileSignature(file: File) {
  return file.name + file.type + file.size;
}

export function getVideoDuration(file: File) {
  const input = new Input({
    source: new BlobSource(file),
    formats: ALL_FORMATS,
  });
  return input.computeDuration();
}
