import { StickerMotion } from './types';

const config: {
    fileLimit: number;
    acceptValues: Record<StickerMotion, string>;
} = {
    fileLimit: 25,
    acceptValues: {
        static: 'image/*',
        video: '.apng, .png, .avif, .gif, .webp, video/*',
    },
};

export { config };
