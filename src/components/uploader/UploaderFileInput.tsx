import type { ChangeEvent, ComponentPropsWithRef } from 'react';

import { selectCanUpload, uploadFiles } from '@/store/slices/uploader/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { config } from '@/config';
import { devLog } from '@/utils';

import styles from './style.module.scss';

type UploaderFileInputProps = ComponentPropsWithRef<'input'>;

export function UploaderFileInput(props: UploaderFileInputProps) {
  const dispatch = useAppDispatch();
  const isDisabled = !useAppSelector(selectCanUpload);

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      dispatch(uploadFiles(target.files))
        .catch(devLog)
        .finally(() => {
          target.value = '';
        });
    }
  }

  return (
    <input
      className={styles.fileInput}
      type='file'
      accept={config.accept}
      multiple
      disabled={isDisabled}
      onChange={handleChange}
      {...props}
    />
  );
}
