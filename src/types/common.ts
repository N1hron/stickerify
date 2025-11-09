import type { FunctionComponent, SVGProps } from 'react';

export type KeysMatching<T extends object, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type IconComponent = FunctionComponent<
  SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;
