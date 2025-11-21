import clsx from 'clsx';

import ArrowLeft from '@icons/arrow-left.svg?react';
import { Button } from '../button/Button';
import { capitalize } from '@/utils';

import styles from './style.module.scss';

export type SelectCarouselButtonProps = {
  incrementIndexBy: (n: number) => void;
  direction: 'next' | 'previous';
  valueId: string;
};

export function SelectCarouselButton({
  incrementIndexBy,
  direction,
  valueId,
}: SelectCarouselButtonProps) {
  const isNext = direction === 'next';
  const label = capitalize(direction);
  const cl = clsx(styles.button, isNext && styles.buttonNext);

  function handleClick() {
    incrementIndexBy(isNext ? 1 : -1);
  }

  return (
    <Button
      className={cl}
      size='medium'
      icon
      aria-label={label}
      aria-controls={valueId}
      onClick={handleClick}
    >
      <ArrowLeft className={styles.icon} aria-hidden />
    </Button>
  );
}
