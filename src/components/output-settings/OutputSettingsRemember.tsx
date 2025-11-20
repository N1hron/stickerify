import { useId } from 'react';

import { Checkbox, Label } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectRememberOutputSettings,
  setRememberOutputSettings,
} from '@/store/slices/outputSettings';

import styles from './style.module.scss';

export function OutputSettingsRemember() {
  const checkboxId = useId();
  const dispatch = useAppDispatch();
  const rememberSettings = useAppSelector(selectRememberOutputSettings);

  function setValue(value: boolean) {
    dispatch(setRememberOutputSettings(value));
  }

  return (
    <div className={styles.remember}>
      <Checkbox id={checkboxId} value={rememberSettings} setValue={setValue} />
      <Label tag='label' htmlFor={checkboxId}>
        Remember choice
      </Label>
    </div>
  );
}
