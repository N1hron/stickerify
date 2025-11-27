import { devLog } from './devLog';

export function loadVideoMetadata(url: string): Promise<HTMLVideoElement> {
  const video = document.createElement('video');
  video.src = url;

  devLog(`Loading metadata for ${url}`);

  return new Promise<HTMLVideoElement>((resolve, reject) => {
    video.onloadedmetadata = () => {
      devLog(`Successfully loaded metadata for ${url}`);
      resolve(video);
    };
    video.onerror = () => {
      devLog(`Failed to load metadata for ${url}`);
      reject(new Error('Could not load video metadata'));
    };
  }).finally(() => {
    video.onloadedmetadata = null;
    video.onerror = null;
  });
}
