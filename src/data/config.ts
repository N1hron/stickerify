import { StickerMotionType } from '@/types';

const config: {
    fileLimit: number;
    accept: Record<StickerMotionType, string>;
} = {
    fileLimit: 25,
    accept: {
        static: 'image/*',
        video: '.apng, .png, .avif, .gif, .webp, video/*',
    },
};

export { config };
