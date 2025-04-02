import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addFiles, selectAllFiles, selectAllowAdd } from '@/store/slices/transcoder';
import { selectSetting } from '@/store/slices/output-settings';
import { validateFiles } from '@/utils';
import { config } from '@/data';
import { FileListItem } from './FileListItem';

import styles from '../style.module.scss';
import clsx from 'clsx';

function FileList() {
    const dispatch = useAppDispatch();

    const [dragEnterCount, setDragEnterCount] = useState(0);
    const files = useAppSelector(selectAllFiles);
    const allowAdd = useAppSelector(selectAllowAdd);
    const stickerMotionType = useAppSelector(selectSetting('stickerMotionType'));
    const accept = config.accept[stickerMotionType];
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
            const [validFiles] = validateFiles(files, accept);

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
