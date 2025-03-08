import { useRef, useId } from 'react';
import clsx from 'clsx';

import { Button } from '../';
import { validateFiles } from '../../../utils';

import styles from './style.module.scss';

type FileInputProps = {
    label: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?: (validFiles: File[], invalidFiles: File[]) => void;
};

function FileInput({
    label,
    accept = '',
    multiple = true,
    disabled,
    className,
    onChange,
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const cl = clsx(styles.fileInput, className);

    function handleBrowse() {
        inputRef.current?.click();
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!onChange) return;

        const files = event.target.files;
        if (files) {
            const [validFiles, invalidFiles] = validateFiles(Array.from(files), accept);
            onChange(validFiles, invalidFiles);
        }
    }

    return (
        <div className={cl}>
            <Button
                className={styles.browse}
                color='accent'
                tabIndex={-1}
                disabled={disabled}
                onClick={handleBrowse}
            >
                {label}
            </Button>
            <input
                className='visually-hidden'
                id={inputId}
                type='file'
                multiple={multiple}
                accept={accept}
                disabled={disabled}
                aria-label={label}
                ref={inputRef}
                onChange={handleChange}
            />
        </div>
    );
}

export { FileInput };
