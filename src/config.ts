import type {
  HorizontalAlignment,
  StickerFormat,
  StickerSizeType,
  VerticalAlignment,
} from './types';

export const config = {
  outputSettings: {
    entries: {
      string: {
        sizeType: ['sticker', 'emoji'] satisfies StickerSizeType[],
        format: ['webp', 'png'] satisfies StickerFormat[],
        horizontalAlignment: ['left', 'middle', 'right'] satisfies HorizontalAlignment[],
        verticalAlignment: ['top', 'middle', 'bottom'] satisfies VerticalAlignment[],
      },
      boolean: ['trimSpaces', 'scaleUp'],
    },
    localStorageKey: 'outputSettings',
    rememberLocalStorageKey: 'rememberOutputSettings',
  },
} as const;

export type Config = typeof config;
