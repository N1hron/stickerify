import { useRef } from 'react';

import { Droparea } from '../ui/droparea/Droparea';
import { FileInput } from '../ui/file-input/FileInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFile, selectFiles, selectIsUploading, setIsUploading } from '@/store/slices/converter';
import { config } from '@/config';
import { generateFileData } from './utils';

import styles from './style.module.scss';

const { accept, maxFiles } = config;

export function ConverterUploader() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const isUploading = useAppSelector(selectIsUploading);
  const existingFiles = useAppSelector(selectFiles);
  const fileCount = existingFiles.length;
  const availableSpace = maxFiles - fileCount;
  const isDisabled = isUploading || availableSpace <= 0;

  function handleUpload(files: FileList | null) {
    if (!isDisabled && files) {
      let spaceLeft = availableSpace;
      void (async function () {
        dispatch(setIsUploading(true));
        for await (const fileData of generateFileData(files, existingFiles)) {
          dispatch(addFile(fileData));
          if (--spaceLeft <= 0) break;
        }
        dispatch(setIsUploading(false));
      })();
    }
  }

  function clickFileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className={styles.uploader}>
      <Droparea
        className={styles.droparea}
        accept={accept}
        disabled={isDisabled}
        onChange={handleUpload}
        onClick={clickFileInput}
      >
        <div className={styles.fileCount}>
          {fileCount}/{maxFiles}
        </div>

        <div className={styles.fileInputWrapper}>
          <FileInput
            className={styles.fileInput}
            accept={accept}
            disabled={isDisabled}
            onChange={handleUpload}
            ref={fileInputRef}
          >
            Select files
          </FileInput>
        </div>
      </Droparea>
    </div>
  );
}
