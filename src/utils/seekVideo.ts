import { devLog } from './devLog';

export function seekVideo(video: HTMLVideoElement, time: number) {
  video.currentTime = time;

  devLog(`Seeking video for time = ${time}`);

  return new Promise<void>((resolve, reject) => {
    video.onseeked = () => {
      devLog(`Successfully seeked video for time = ${time}`);
      resolve();
    };
    video.onerror = () => {
      devLog(`Failed to seek video for time = ${time}`);
      reject(new Error('Could not seek video time'));
    };
  }).finally(() => {
    video.onseeked = null;
    video.onerror = null;
  });
}
