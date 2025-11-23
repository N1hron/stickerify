import clsx from 'clsx';
import { useId, useRef, type ChangeEvent, type ComponentPropsWithRef } from 'react';

import { Button } from '../button/Button';

import styles from './style.module.scss';

type FileInputProps = Omit<ComponentPropsWithRef<typeof Button>, 'onChange'> & {
  accept?: string;
  disabled?: boolean;
  onChange?: (files: FileList | null) => void;
};

export function FileInput({
  accept,
  disabled,
  onChange,
  children,
  className,
  ...props
}: FileInputProps) {
  const buttonId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const cl = clsx(styles.fileInput, className);

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.files);
      event.target.value = '';
    }
  }

  return (
    <>
      <Button
        className={cl}
        id={buttonId}
        tabIndex={-1}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
      <input
        className={styles.input}
        aria-labelledby={buttonId}
        type='file'
        accept={accept}
        multiple
        disabled={disabled}
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
}
