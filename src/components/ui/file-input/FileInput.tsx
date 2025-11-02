import { ReactNode, useRef } from 'react';
import clsx from 'clsx';

import { Button } from '@ui';
import { validateFiles } from '@utils';

import styles from './style.module.scss';

type FileInputProps = {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    mini?: boolean;
    children: ReactNode;
    label: string;
    className?: string;
    onChange?: (validFiles: File[], invalidFiles: File[]) => void;
};

function FileInput({
    accept = '',
    multiple = true,
    disabled,
    mini,
    className,
    children,
    label,
    onChange,
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
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
        event.target.value = '';
    }

    return (
        <div className={cl}>
            <Button
                className={styles.browse}
                color='accent'
                mini={mini}
                disabled={disabled}
                aria-hidden
                tabIndex={-1}
                onClick={handleBrowse}
            >
                {children}
            </Button>
            <input
                className='visually-hidden'
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
