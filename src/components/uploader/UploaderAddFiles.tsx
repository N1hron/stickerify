import { useId, useRef } from 'react';

import { Button } from '../ui';
import { UploaderFileInput } from './UploaderFileInput';
import { useAppSelector } from '@/store/hooks';
import { selectCanUpload } from '@/store/slices/uploader/index';

import styles from './style.module.scss';

export function UploaderAddFiles() {
  const buttonId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const isDisabled = !useAppSelector(selectCanUpload);

  function handleClick() {
    if (!isDisabled && inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <Button
        className={styles.addFiles}
        id={buttonId}
        tabIndex={-1}
        disabled={isDisabled}
        onClick={handleClick}
      >
        Select files
      </Button>
      <UploaderFileInput aria-labelledby={buttonId} ref={inputRef} />
    </>
  );
}
