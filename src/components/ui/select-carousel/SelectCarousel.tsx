import clsx from 'clsx';
import { useId, type ComponentPropsWithRef } from 'react';

import { SelectCarouselButton } from './SelectCarouselButton';
import { wrap } from '@/utils';

import styles from './style.module.scss';

type SelectCarouselProps<V extends string> = ComponentPropsWithRef<'div'> & {
  value: V;
  values: V[];
  setValue: (value: V) => void;
};

function SelectCarousel<V extends string>({
  value,
  values,
  setValue,
  className,
  ...props
}: SelectCarouselProps<V>) {
  const valueId = useId();
  const index = values.indexOf(value);
  const maxIndex = values.length - 1;
  const cl = clsx(styles.selectCarousel, className);

  function incrementIndexBy(n: number) {
    setValue(values[wrap(0, index + n, maxIndex)]);
  }

  return (
    <div className={cl} {...props}>
      <SelectCarouselButton
        incrementIndexBy={incrementIndexBy}
        valueId={valueId}
        direction='previous'
      />

      <div className={styles.value} id={valueId} aria-live='polite'>
        {value}
      </div>

      <SelectCarouselButton
        incrementIndexBy={incrementIndexBy}
        valueId={valueId}
        direction='next'
      />
    </div>
  );
}

export { SelectCarousel };
