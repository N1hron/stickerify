import clsx from 'clsx';
import { useRef, useState, type DragEvent } from 'react';

import { UploaderFileInput } from './UploaderFileInput';
import { devLog, matchesMimeAccept } from '@/utils';
import { config } from '@/config';
import { selectCanUpload, uploadFiles } from '@/store/slices/uploader/index';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './style.module.scss';

export function UploaderDroparea() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, setIsValid] = useState(true);
  const [dragEnterCount, setDragEnterCount] = useState(0);
  const isDraggingOver = dragEnterCount > 0;
  const isDisabled = !useAppSelector(selectCanUpload);

  const cl = clsx(
    styles.droparea,
    isDisabled && styles.dropareaDisabled,
    isDraggingOver && (isValid ? styles.dropareaValid : styles.dropareaInvalid)
  );

  function validateDataTransfer(dataTransfer: DataTransfer) {
    if (isDisabled) return false;
    for (const { type } of dataTransfer.items) {
      if (matchesMimeAccept(type, config.accept)) {
        return true;
      }
    }
    return false;
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';

    setDragEnterCount((prev) => prev + 1);
    setIsValid(validateDataTransfer(event.dataTransfer));
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragEnterCount((prev) => prev - 1);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = isValid ? 'move' : 'none';
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragEnterCount(0);

    if (isValid) {
      dispatch(uploadFiles(event.dataTransfer.files)).catch((err) => devLog(err));
    }
  }

  function handleClick() {
    if (inputRef.current && !isDisabled) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <div
        className={cl}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      />
      <UploaderFileInput ref={inputRef} hidden />
    </>
  );
}
