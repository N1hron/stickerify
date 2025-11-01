import clsx from 'clsx';
import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

import styles from './style.module.scss';
import { CardTitle } from './CardTitle';

type CardElementType = ElementType<{ children?: ReactNode; className?: string }>;

type CardProps<T extends CardElementType> = {
  as?: T;
} & ComponentPropsWithRef<T>;

function Card<T extends CardElementType = 'div'>({ as, className, ...props }: CardProps<T>) {
  const Element: CardElementType = as || 'div';
  const cl = clsx(styles.card, className);

  return <Element className={cl} {...props} />;
}

Card.Title = CardTitle;

export { Card };
