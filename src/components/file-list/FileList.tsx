import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectSetting } from '../../store/slices/settings';
import { FileListHeader } from './FileListHeader';
import { FileListItem } from './FileListItem';
import { FileListStatus } from './FileListStatus';
import { validateFiles } from '../../utils';
import { config } from '../../config';
import {
    selectTranscoderStatus,
    addFiles,
    selectAllFiles,
    loadTranscoder,
} from '../../store/slices/transcoder';

import styles from './style.module.scss';

let didInit = false;

function FileList() {
    const dispatch = useAppDispatch();

    const [dragEnterCount, setDragEnterCount] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const files = useAppSelector(selectAllFiles);
    const stickerMotion = useAppSelector(selectSetting('stickerMotion'));

    const transcoderReady = transcoderStatus === 'ready';
    const accept = config.acceptValues[stickerMotion];
    const isDraggingOver = dragEnterCount > 0;

    const cl = clsx(styles.fileList, isDraggingOver && styles.dragOver);

    useEffect(() => {
        if (!didInit) {
            dispatch(loadTranscoder());
            didInit = true;
        }
    }, []);

    useEffect(() => {
        const setDropEffect = (event: DragEvent) => {
            event.preventDefault();
            if (!event.dataTransfer) return;

            const dataTransfer = event.dataTransfer;

            if (listRef.current && transcoderReady) {
                const target = event.target as Node;
                const list = listRef.current;
                const isFile = Array.from(dataTransfer.items).find((item) => item.kind === 'file');

                if (isFile && (list === target || list.contains(target))) {
                    dataTransfer.dropEffect = 'move';
                } else {
                    dataTransfer.dropEffect = 'none';
                }
            } else {
                dataTransfer.dropEffect = 'none';
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
    }, [transcoderReady]);

    function handleDrop(event: React.DragEvent<HTMLUListElement>) {
        if (!transcoderReady) return;

        const files = Array.from(event.dataTransfer.files);
        const [validFiles] = validateFiles(files, accept);
        dispatch(addFiles(validFiles));

        setDragEnterCount(0);
    }

    function handleDragEnter() {
        if (!transcoderReady) return;

        setDragEnterCount((p) => (p < 0 ? 0 : p + 1));
    }

    function handleDragLeave() {
        if (!transcoderReady) return;

        setDragEnterCount((p) => (p <= 0 ? 0 : p - 1));
    }

    return (
        <div className={cl}>
            <FileListHeader />
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
            <FileListStatus />
        </div>
    );
}

export { FileList };
