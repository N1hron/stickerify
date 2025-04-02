import { useEffect } from 'react';
import clsx from 'clsx';

import { useAppDispatch } from '@store/hooks';
import { loadTranscoder } from '@slices/transcoder';
import { TranscoderStatus } from './TranscoderStatus';
import { TranscoderHeader } from './TranscoderHeader';
import { FileList } from './file-list/FileList';
import { StatusList } from './status-list/StatusList';
import { TranscoderFooter } from './TranscoderFooter';

import styles from './style.module.scss';

let didInit = false;

function Transcoder() {
    const dispatch = useAppDispatch();

    const cl = clsx(styles.transcoder);

    useEffect(() => {
        if (!didInit) {
            dispatch(loadTranscoder());
            didInit = true;
        }
    }, []);

    return (
        <div className={cl}>
            <TranscoderHeader />
            <div className={styles.list} tabIndex={-1}>
                <FileList />
                <StatusList />
            </div>
            <TranscoderStatus />
            <TranscoderFooter />
        </div>
    );
}

export { Transcoder };
