import { useState } from 'react';
import clsx from 'clsx';

import { validateFiles } from './validateFiles';

type DropAreaProps = {
    accept?: string;
    onChange?: (files: File[]) => void;
    children?: React.ReactNode;
};

function DropArea({ accept = '', onChange, children }: DropAreaProps) {
    const [dragEnterCount, setDragEnterCount] = useState(0);
    const isDraggingOver = dragEnterCount > 0;
    const cl = clsx(
        'file-input__drop-area',
        isDraggingOver && 'file-input__drop-area_dragging-over'
    );

    function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        if (!onChange) return;

        const files = event.dataTransfer.files;
        const filesArray = Array.from(files);

        const [validFiles] = validateFiles(filesArray, accept);

        onChange(validFiles);
        setDragEnterCount(0);
    }

    function handleDragEnter() {
        setDragEnterCount((count) => count + 1);
    }

    function handleDragLeave() {
        setDragEnterCount((count) => count - 1);
    }

    return (
        <div
            className={cl}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {children}
            <p className='file-input__drop-area-label'>Drop files here</p>
        </div>
    );
}

export { DropArea };
