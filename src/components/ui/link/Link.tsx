import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

import styles from './style.module.scss';

type LinkProps = ComponentPropsWithRef<'a'>;

export function Link({ className, ...props }: LinkProps) {
  const cl = clsx(styles.link, className);

  return <a className={cl} target='_blank' rel='noreferrer noopener' {...props} />;
}
