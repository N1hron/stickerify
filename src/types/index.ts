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
export type StickerSize = 512 | 100;
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

export type FileData = {
  name: string;
  type: string;
  size: number;
  duration: number;
  width: number;
  height: number;
  url: string;
};

export type ConverterFile = FileData & {
  id: string;
  status: 'idle' | 'error' | 'success';
  settings: {
    type: 'video' | 'static';
    from: number;
    to: number;
  };
};
