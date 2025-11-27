import type { OutputSettingsConfig } from '@/config';
import type { KeysMatching } from './common';
import type { FunctionComponent, SVGProps } from 'react';

export * from './common';

export type IconComponent = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;

export type StickerSizeType = 'sticker' | 'emoji';
export type StickerHorizontalAlignment = 'left' | 'middle' | 'right';
export type StickerVerticalAlignment = 'top' | 'middle' | 'bottom';
export type StickerResizeMode = 'fill' | 'contain' | 'cover' | 'scale down';
export type StickerFormat = 'png' | 'webp';

export type OutputSettings = {
  [N in OutputSettingsConfig[number]['name']]: Extract<
    OutputSettingsConfig[number],
    { name: N }
  > extends {
    values: (infer V)[];
  }
    ? V
    : boolean;
};

export type OutputSettingName = keyof OutputSettings;
export type OutputSettingValue<N extends OutputSettingName> = OutputSettings[N];

export type OutputStringSettingName = KeysMatching<OutputSettings, string>;
export type OutputStringSettingValue<N extends OutputStringSettingName> = OutputSettings[N];
export type OutputStringSettings = Pick<OutputSettings, OutputStringSettingName>;

export type OutputBooleanSettingName = KeysMatching<OutputSettings, boolean>;
export type OutputBooleanSettingValue<N extends OutputBooleanSettingName> = OutputSettings[N];
export type OutputBooleanSettings = Pick<OutputSettings, OutputBooleanSettingName>;

export type SourceData = {
  name: string;
  type: 'video' | 'image';
  mime: string;
  size: number;
  duration: number;
  url: string;
};

export type UploaderItem = {
  signature: string;
  data: SourceData;
};

export type ConverterItem = {
  status: 'idle' | 'loading' | 'success' | 'error';
  settings: {
    type: 'static' | 'video';
    from: number;
    to: number;
  };
};

export type ResultData = {
  id: string;
  name: string;
  url: string;
};

export type XY = [x: number, y: number];
export type WidthHeight = [width: number, height: number];
