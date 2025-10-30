import { useEffect } from 'react';

import { TranscoderStatus } from './TranscoderStatus';
import { TranscoderHeader } from './TranscoderHeader';
import { FileList } from './file-list/FileList';
import { StatusList } from './status-list/StatusList';
import { Actions } from './actions/Actions';
import { useAppDispatch } from '@store/hooks';
import { loadTranscoder } from '@slices/transcoder';

import styles from './style.module.scss';

let didInit = false;

function Transcoder() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!didInit) {
            dispatch(loadTranscoder());
            didInit = true;
        }
    }, []);

    return (
        <section className={styles.transcoder}>
            <TranscoderHeader />
            <div className={styles.list} tabIndex={-1}>
                <FileList />
                <StatusList />
            </div>
            <Actions />

            <div className={styles.outline}>
                <TranscoderStatus />
            </div>
            <div className={styles.outlineRight}></div>
        </section>
    );
}

export { Transcoder };
