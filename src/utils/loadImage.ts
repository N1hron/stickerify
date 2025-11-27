import { devLog } from './devLog';

export function loadImage(url: string): Promise<HTMLImageElement> {
  const image = document.createElement('img');
  image.src = url;

  devLog(`Loading image from ${url}`);

  return new Promise<HTMLImageElement>((resolve, reject) => {
    image.onload = () => {
      devLog(`Successfully loaded image from ${url}`);
      resolve(image);
    };
    image.onerror = () => {
      devLog(`Failed to load image from ${url}`);
      reject(new Error('Failed to load image from url'));
    };
  }).finally(() => {
    image.onload = null;
    image.onerror = null;
  });
}
