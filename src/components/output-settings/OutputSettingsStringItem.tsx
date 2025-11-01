import { useCallback } from 'react';

import { SelectCarousel } from '../ui/select-carousel/SelectCarousel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOutputSetting, setOutputSetting } from '@/store/slices/outputSettings';
import { config } from '@/config';
import type { OutputStringSettingName, OutputStringSettingValue } from '@/types';

type OutputSettingsStringItemProps = {
  name: OutputStringSettingName;
  label: string;
};

export function OutputSettingsStringItem({ name, label }: OutputSettingsStringItemProps) {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectOutputSetting(name));
  const values = config.outputSettings.entries.string[name];

  const setValue = useCallback(
    (value: OutputStringSettingValue<typeof name>) => {
      dispatch(setOutputSetting([name, value]));
    },
    [dispatch]
  );

  return (
    <li>
      <SelectCarousel label={label} values={values} value={value} setValue={setValue} />
    </li>
  );
}
