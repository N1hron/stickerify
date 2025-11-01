import clsx from 'clsx';

import ArrowLeft from '@icons/arrow-left.svg?react';
import { Button } from '../button/Button';
import { wrap } from '@/utils';
import { useSelectCarouselContext } from './SelectCarouselContext';

import styles from './style.module.scss';

export type SelectCarouselButtonProps = {
  next?: boolean;
};

export function SelectCarouselButton({ next }: SelectCarouselButtonProps) {
  const { index, maxIndex, setIndex, valueId } = useSelectCarouselContext();
  const cl = clsx(styles.button, next && styles.buttonNext);
  const label = next ? 'Next' : 'Previous';

  function handleClick() {
    const step = next ? 1 : -1;
    setIndex(wrap(0, index + step, maxIndex));
  }

  return (
    <Button
      className={cl}
      aria-label={label}
      aria-controls={valueId}
      mini
      icon
      onClick={handleClick}
    >
      <ArrowLeft className={styles.icon} aria-hidden />
    </Button>
  );
}
