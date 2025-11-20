import clsx from 'clsx';
import { useCallback, useId, useMemo, type ComponentPropsWithRef } from 'react';

import { SelectCarouselButton } from './SelectCarouselButton';
import { SelectCarouselValue } from './SelectCarouselValue';
import { SelectCarouselContext, type SelectCarouselContextValue } from './SelectCarouselContext';

import styles from './style.module.scss';

type SelectCarouselProps<V extends string> = ComponentPropsWithRef<'div'> & {
  values: V[];
  value: V;
  setValue: (value: V) => void;
};

function SelectCarousel<V extends string>({
  values,
  value,
  setValue,
  className,
  ...props
}: SelectCarouselProps<V>) {
  const valueId = useId();
  const index = values.indexOf(value);
  const maxIndex = values.length - 1;
  const cl = clsx(styles.selectCarousel, className);

  const setIndex = useCallback(
    (index: number) => {
      setValue(values[index]);
    },
    [setValue, values]
  );

  const contextValue: SelectCarouselContextValue = useMemo(
    () => ({
      value,
      index,
      maxIndex,
      setIndex,
      valueId,
    }),
    [value, index, maxIndex, setIndex, valueId]
  );

  return (
    <div className={cl} {...props}>
      <SelectCarouselContext value={contextValue}>
        <SelectCarouselButton direction='previous' />
        <SelectCarouselValue />
        <SelectCarouselButton direction='next' />
      </SelectCarouselContext>
    </div>
  );
}

export { SelectCarousel };
