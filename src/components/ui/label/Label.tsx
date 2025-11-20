import clsx from 'clsx';
import type { ComponentPropsWithRef, ElementType } from 'react';

import styles from './style.module.scss';

type LabelProps<T extends 'label' | 'span'> = ComponentPropsWithRef<T> & {
  tag: T;
} & (T extends 'label' ? { htmlFor: string } : { id: string });

export function Label<T extends 'label' | 'span'>({ className, tag, ...props }: LabelProps<T>) {
  const Tag = tag as ElementType;
  const cl = clsx(styles.label, className);

  return <Tag className={cl} {...props} />;
}
