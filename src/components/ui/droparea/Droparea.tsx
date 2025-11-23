import clsx from 'clsx';
import { useState, type ComponentPropsWithRef, type DragEvent } from 'react';

import { matchesMimeAccept } from '@/utils';

import styles from './style.module.scss';

type DropareaProps = Omit<ComponentPropsWithRef<'div'>, 'onChange'> & {
  disabled?: boolean;
  accept?: string;
  onChange?: (files: FileList) => void;
};

export function Droparea({
  accept = '',
  disabled,
  className,
  onClick,
  onChange,
  ...props
}: DropareaProps) {
  const [isDragValid, setIsDragValid] = useState(true);
  const [dragEnterCount, setDragEnterCount] = useState(0);
  const isDraggingOver = dragEnterCount > 0;
  const isValid = !disabled && isDraggingOver && isDragValid;
  const isInvalid = !disabled && isDraggingOver && !isDragValid;

  const cl = clsx(
    styles.droparea,
    isValid && styles.dropareaValid,
    isInvalid && styles.dropareaInvalid,
    onClick && styles.dropareaClickable,
    disabled && styles.dropareaDisabled,
    className
  );

  function validateDataTransfer(dataTransfer: DataTransfer) {
    for (const { type } of dataTransfer.items) {
      if (matchesMimeAccept(type, accept)) {
        return true;
      }
    }
    return false;
  }

  function handleDragEnter(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragEnterCount((prev) => prev + 1);

    if (disabled) {
      event.dataTransfer.effectAllowed = 'none';
    } else {
      event.dataTransfer.effectAllowed = 'move';

      const isDragValid = validateDataTransfer(event.dataTransfer);
      setIsDragValid(isDragValid);
    }
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

    if (onChange && isValid) {
      onChange(event.dataTransfer.files);
    }
  }

  return (
    <div
      className={cl}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={onClick}
      {...props}
    />
  );
}
