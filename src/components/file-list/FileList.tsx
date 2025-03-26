import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectSetting } from '@slices/output-settings';
import {
    selectTranscoderStatus,
    addFiles,
    selectAllFiles,
    loadTranscoder,
} from '@slices/transcoder';
import { validateFiles } from '@utils';
import { config } from '@data';

import { ListHeader } from './ListHeader';
import { ListItem } from './ListItem';
import { Status } from './Status';

import styles from './style.module.scss';

let didInit = false;

function FileList() {
    const dispatch = useAppDispatch();

    const [dragEnterCount, setDragEnterCount] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);

    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const files = useAppSelector(selectAllFiles);
    const stickerMotionType = useAppSelector(selectSetting('stickerMotionType'));

    const transcoderReady = transcoderStatus === 'ready';
    const accept = config.accept[stickerMotionType];
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
            <ListHeader />
            <ul
                className={styles.list}
                ref={listRef}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                {files.map((fileData, i) => (
                    <ListItem key={fileData.id} index={i} fileData={fileData} />
                ))}
            </ul>
            <Status />
        </div>
    );
}

export { FileList };
