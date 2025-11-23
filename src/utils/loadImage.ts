export async function loadImage(image: HTMLImageElement, url: string): Promise<void> {
  image.src = url;

  return new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('Failed to load image from url'));
  }).finally(() => {
    image.onload = null;
    image.onerror = null;
  });
}
