import { useRef } from 'react';

import { DropArea } from './DropArea';
import { Button } from '../Button/Button';
import { validateFiles } from './validateFiles';
import { isMobileDevice } from '../../../utils';

import './FileInput.scss';

type FileInputProps = {
    label: string;
    accept?: string;
    onChange?: (files: File[]) => void;
    children?: React.ReactNode;
};

function FileInput({ label, accept = '', onChange, children }: FileInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const showDropArea = !isMobileDevice();

    function handleBrowseClick() {
        inputRef.current?.click();
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!onChange) return;

        const files = event.target.files;
        const filesArray = files ? Array.from(files) : [];

        const [validFiles] = validateFiles(filesArray, accept);

        onChange(validFiles);
    }

    return (
        <div className='file-input'>
            {showDropArea ? (
                <DropArea
                    accept={accept}
                    onChange={onChange}
                    children={children}
                />
            ) : (
                children
            )}
            <input
                className='file-input__original-input visually-hidden'
                ref={inputRef}
                aria-label={label}
                type='file'
                multiple
                accept={accept}
                onChange={handleInputChange}
            />
            <Button filled tabIndex={-1} onClick={handleBrowseClick}>
                Browse
            </Button>
        </div>
    );
}

export { FileInput };
