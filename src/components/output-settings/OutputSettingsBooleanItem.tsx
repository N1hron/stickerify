import { useCallback } from 'react';

import { Checkbox } from '../ui/checkbox/Checkbox';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOutputSetting, setOutputSetting } from '@/store/slices/outputSettings';
import type { OutputBooleanSettingName } from '@/types';

type OutputSettingsBooleanItemProps = {
  name: OutputBooleanSettingName;
  label: string;
};

export function OutputSettingsBooleanItem({ name, label }: OutputSettingsBooleanItemProps) {
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectOutputSetting(name));

  const setValue = useCallback(
    (value: boolean) => {
      dispatch(setOutputSetting([name, value]));
    },
    [dispatch]
  );

  return (
    <li>
      <Checkbox label={label} value={value} setValue={setValue} />
    </li>
  );
}
