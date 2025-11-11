import { Button } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetOutputSettings, selectIsDefaultOutputSettings } from '@/store/slices/outputSettings';

import styles from './style.module.scss';

export function OutputSettingsRestore() {
  const dispatch = useAppDispatch();
  const isDefault = useAppSelector(selectIsDefaultOutputSettings);

  function handleClick() {
    dispatch(resetOutputSettings());
  }

  return (
    <Button className={styles.restore} onClick={handleClick} disabled={isDefault}>
      Restore defaults
    </Button>
  );
}
