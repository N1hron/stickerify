import { useSelectCarouselContext } from './SelectCarouselContext';

import styles from './style.module.scss';

export function SelectCarouselValue() {
  const { value, valueId } = useSelectCarouselContext();

  return (
    <div className={styles.value} id={valueId} aria-live='polite'>
      {value}
    </div>
  );
}
