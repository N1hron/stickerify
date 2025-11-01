import type { FunctionComponent, SVGProps } from 'react';

export type StickerSize = 100 | 512;
export type StickerSizeType = 'sticker' | 'emoji';
export type StickerDurationType = 'static' | 'video';
export type StickerFormat = 'webp' | 'png';

export type HorizontalAlignment = 'left' | 'middle' | 'right';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';

export type KeysMatching<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type TrueFalse = [true, false];

export type IconComponent = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;
