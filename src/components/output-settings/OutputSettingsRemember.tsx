import { Checkbox } from '@ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectRememberOutputSettings,
  setRememberOutputSettings,
} from '@/store/slices/outputSettings';

export function OutputSettingsRemember() {
  const dispatch = useAppDispatch();
  const rememberSettings = useAppSelector(selectRememberOutputSettings);

  function setValue(value: boolean) {
    dispatch(setRememberOutputSettings(value));
  }

  return <Checkbox label='Remember choice' value={rememberSettings} setValue={setValue} />;
}
