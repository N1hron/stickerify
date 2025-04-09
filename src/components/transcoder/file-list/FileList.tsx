import { useState } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addFiles, selectAllFiles, selectAllowAdd } from '@slices/transcoder';
import { validateFiles } from '@utils';
import { FILE_ACCEPT } from '@config';
import { FileListItem } from './FileListItem';

import styles from './style.module.scss';

function FileList() {
    const dispatch = useAppDispatch();

    const files = useAppSelector(selectAllFiles);
    const allowAdd = useAppSelector(selectAllowAdd);

    const [dragEnterCount, setDragEnterCount] = useState(0);
    const isDraggingOver = dragEnterCount > 0;

    const cl = clsx(styles.fileList, isDraggingOver && styles.draggingOver);

    function handleDragEnter() {
        if (allowAdd) {
            setDragEnterCount((p) => (p < 0 ? 0 : p + 1));
        }
    }

    function handleDragLeave() {
        if (allowAdd) {
            setDragEnterCount((p) => (p <= 0 ? 0 : p - 1));
        }
    }

    function handleDragOver(event: React.DragEvent<HTMLUListElement>) {
        if (allowAdd) {
            event.preventDefault();
        }
    }

    function handleDrop(event: React.DragEvent<HTMLUListElement>) {
        if (allowAdd) {
            event.preventDefault();

            const files = Array.from(event.dataTransfer.files);
            const [validFiles] = validateFiles(files, FILE_ACCEPT);

            dispatch(addFiles(validFiles));
            setDragEnterCount(0);
        }
    }

    return (
        <ul
            className={cl}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {files.map((file, i) => (
                <FileListItem key={file.id} number={i + 1} file={file} />
            ))}
        </ul>
    );
}

export { FileList };
