import { useCallback, useId, useMemo } from 'react';

import { Label, SelectCarousel } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOutputSetting, setOutputSetting } from '@/store/slices/outputSettings';
import { config } from '@/config';
import type { OutputStringSettingName, OutputStringSettingValue } from '@/types';

import styles from './style.module.scss';

type OutputSettingsInputStringProps = {
  name: OutputStringSettingName;
  label: string;
};

export function OutputSettingsInputString({ name, label }: OutputSettingsInputStringProps) {
  const labelId = useId();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectOutputSetting(name));

  const values = useMemo(() => {
    const stringSettings = Object.fromEntries(
      config.outputSettings.items
        .filter((item) => 'values' in item)
        .map((item) => [item.name, item.values])
    );

    return stringSettings[name];
  }, [name]);

  const setValue = useCallback(
    (value: OutputStringSettingValue<typeof name>) => {
      dispatch(setOutputSetting([name, value]));
    },
    [dispatch, name]
  );

  return (
    <div className={styles.stringItem}>
      <Label tag='span' id={labelId}>
        {label}
      </Label>
      <SelectCarousel aria-labelledby={labelId} values={values} value={value} setValue={setValue} />
    </div>
  );
}
