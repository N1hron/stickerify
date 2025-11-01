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
  label: string;
};

function SelectCarousel<V extends string>({
  values,
  value,
  setValue,
  label,
  className,
  ...props
}: SelectCarouselProps<V>) {
  const labelId = useId();
  const valueId = useId();
  const index = values.indexOf(value);
  const maxIndex = values.length - 1;
  const cl = clsx(styles.selectCarousel, className);

  if (index < 0 || index > maxIndex) {
    setValue(values[0]);
  }

  const setIndex = useCallback((index: number) => {
    setValue(values[index]);
  }, []);

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
      <span className={styles.label} id={labelId}>
        {label}
      </span>
      <div className={styles.content} role='region' aria-labelledby={labelId}>
        <SelectCarouselContext value={contextValue}>
          <SelectCarouselButton />
          <SelectCarouselValue />
          <SelectCarouselButton next />
        </SelectCarouselContext>
      </div>
    </div>
  );
}

export { SelectCarousel };
