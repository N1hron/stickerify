import { useState, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFiles, selectAllFiles } from '../../store/slices/transcoder';
import { selectSetting } from '../../store/slices/settings';
import { FileListHeader } from './FileListHeader';
import { FileListItem } from './FileListItem';
import { UploadIcon } from '../icons';
import { validateFiles } from '../../utils';
import { config } from '../../config';

import styles from './style.module.scss';
import clsx from 'clsx';

function FileList() {
    const dispatch = useAppDispatch();

    const listRef = useRef<HTMLUListElement>(null);
    const [dragEnterCount, setDragEnterCount] = useState(0);
    const files = useAppSelector(selectAllFiles);
    const stickerMotion = useAppSelector(selectSetting('stickerMotion'));

    const filesEmpty = files.length === 0;
    const accept = config.acceptValues[stickerMotion];
    const isDraggingOver = dragEnterCount !== 0;

    const cl = clsx(styles.fileList, isDraggingOver && styles.dragOver);

    useEffect(() => {
        const setDropEffect = (event: DragEvent) => {
            event.preventDefault();

            if (event.dataTransfer && listRef.current) {
                const target = event.target as Node;
                const list = listRef.current;
                const dataTransfer = event.dataTransfer;
                const isFile = Array.from(dataTransfer.items).find((item) => item.kind === 'file');

                if (isFile && (list === target || list.contains(target))) {
                    dataTransfer.dropEffect = 'move';
                } else {
                    dataTransfer.dropEffect = 'none';
                }
            }
        };

        const preventDefault = (event: DragEvent) => {
            event.preventDefault();
        };

        window.addEventListener('dragenter', setDropEffect);
        window.addEventListener('dragover', setDropEffect);
        window.addEventListener('drop', preventDefault);

        return () => {
            window.removeEventListener('dragenter', setDropEffect);
            window.removeEventListener('dragover', setDropEffect);
            window.removeEventListener('drop', preventDefault);
        };
    }, []);

    function handleDrop(event: React.DragEvent<HTMLUListElement>) {
        const files = Array.from(event.dataTransfer.files);
        const [validFiles] = validateFiles(files, accept);
        dispatch(addFiles(validFiles));

        setDragEnterCount(0);
    }

    function handleDragEnter() {
        setDragEnterCount((p) => p + 1);
    }

    function handleDragLeave() {
        setDragEnterCount((p) => p - 1);
    }

    return (
        <div className={cl}>
            {!filesEmpty && <FileListHeader />}
            <ul
                className={styles.list}
                ref={listRef}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                {files.map((fileData, i) => (
                    <FileListItem key={fileData.id} index={i} fileData={fileData} />
                ))}
            </ul>
            {filesEmpty && <UploadIcon className={styles.icon} aria-hidden />}
        </div>
    );
}

export { FileList };
