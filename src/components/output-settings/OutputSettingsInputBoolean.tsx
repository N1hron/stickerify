import { useCallback, useId } from 'react';

import { Checkbox, Label } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOutputSetting, setOutputSetting } from '@/store/slices/outputSettings';
import type { OutputBooleanSettingName } from '@/types';

import styles from './style.module.scss';

type OutputSettingsInputBooleanProps = {
  name: OutputBooleanSettingName;
  label: string;
};

export function OutputSettingsInputBoolean({ name, label }: OutputSettingsInputBooleanProps) {
  const checkboxId = useId();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectOutputSetting(name));

  const setValue = useCallback(
    (value: boolean) => {
      dispatch(setOutputSetting([name, value]));
    },
    [dispatch, name]
  );

  return (
    <div className={styles.booleanItem}>
      <Checkbox id={checkboxId} value={value} setValue={setValue} />
      <Label tag='label' htmlFor={checkboxId}>
        {label}
      </Label>
    </div>
  );
}
