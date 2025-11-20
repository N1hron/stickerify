import clsx from 'clsx';

import ArrowLeft from '@icons/arrow-left.svg?react';
import { Button } from '../button/Button';
import { capitalize, wrap } from '@/utils';
import { useSelectCarouselContext } from './SelectCarouselContext';

import styles from './style.module.scss';

export type SelectCarouselButtonProps = {
  direction: 'next' | 'previous';
};

export function SelectCarouselButton({ direction }: SelectCarouselButtonProps) {
  const { index, maxIndex, setIndex, valueId } = useSelectCarouselContext();
  const isNext = direction === 'next';
  const cl = clsx(styles.button, isNext && styles.buttonNext);
  const label = capitalize(direction);

  function handleClick() {
    const step = isNext ? 1 : -1;
    setIndex(wrap(0, index + step, maxIndex));
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
