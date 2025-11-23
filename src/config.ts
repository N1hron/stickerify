import type {
  StickerFormat,
  StickerHorizontalAlignment,
  StickerResizeMode,
  StickerSizeType,
  StickerVerticalAlignment,
} from '@/types';

type OutputSettingItemBase = {
  name: string;
  label: string;
};

type OutputSettingItemBoolean = OutputSettingItemBase & {
  default: boolean;
};

type OutputSettingItemString<V extends string> = OutputSettingItemBase & {
  values: V[];
  default: V;
};

export const config = {
  outputSettings: {
    items: [
      {
        name: 'sizeType',
        label: 'Size type',
        values: ['sticker', 'emoji'],
        default: 'sticker',
      } as const satisfies OutputSettingItemString<StickerSizeType>,
      {
        name: 'horizontalAlignment',
        label: 'Horizontal alignment',
        values: ['left', 'middle', 'right'],
        default: 'middle',
      } as const satisfies OutputSettingItemString<StickerHorizontalAlignment>,
      {
        name: 'verticalAlignment',
        label: 'Vertical alignment',
        values: ['top', 'middle', 'bottom'],
        default: 'middle',
      } as const satisfies OutputSettingItemString<StickerVerticalAlignment>,
      {
        name: 'resizeMode',
        label: 'Resize Mode',
        values: ['fill', 'contain', 'cover', 'scale down'],
        default: 'scale down',
      } as const satisfies OutputSettingItemString<StickerResizeMode>,
      {
        name: 'format',
        label: 'File format',
        values: ['png', 'webp'],
        default: 'webp',
      } as const satisfies OutputSettingItemString<StickerFormat>,
      {
        name: 'trim',
        label: 'Remove empty spaces',
        default: true,
      } as const satisfies OutputSettingItemBoolean,
    ],
    keyLS: 'outputSettings',
    rememberKeyLS: 'rememberOutputSettings',
  } as const,
  maxFiles: 20,
  accept: 'image/*, video/*',
} as const;

export type Config = typeof config;
export type OutputSettingsConfig = Config['outputSettings']['items'];
