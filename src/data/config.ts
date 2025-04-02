import { StickerMotionType } from '@/types';

const config: {
    fileLimit: number;
    accept: Record<StickerMotionType, string>;
} = {
    fileLimit: 25,
    accept: {
        static: 'image/*',
        video: 'video/*, .apng, .png, .avif, .gif, .webp',
    },
};

export { config };
