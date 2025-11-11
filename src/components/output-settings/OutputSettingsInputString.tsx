import { useCallback, useMemo } from 'react';

import { SelectCarousel } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOutputSetting, setOutputSetting } from '@/store/slices/outputSettings';
import { config } from '@/config';
import type { OutputStringSettingName, OutputStringSettingValue } from '@/types';

type OutputSettingsInputStringProps = {
  name: OutputStringSettingName;
  label: string;
};

export function OutputSettingsInputString({ name, label }: OutputSettingsInputStringProps) {
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

  return <SelectCarousel label={label} values={values} value={value} setValue={setValue} />;
}
