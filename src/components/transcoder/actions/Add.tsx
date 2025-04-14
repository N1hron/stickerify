import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addFiles, selectAllowAdd, selectFilesAmount } from '@slices/transcoder';
import { FILE_LIMIT, FILE_ACCEPT } from '@/config';
import { FileInput, Divider } from '@ui';

import styles from './style.module.scss';

function Add() {
    const dispatch = useAppDispatch();
    const allowAdd = useAppSelector(selectAllowAdd);
    const filesAmount = useAppSelector(selectFilesAmount);

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <div className={styles.add}>
            <div className={styles.fileCount}>
                <span>
                    {filesAmount} / {FILE_LIMIT}
                </span>
            </div>
            <FileInput
                label='Add'
                accept={FILE_ACCEPT}
                disabled={!allowAdd}
                mini
                onChange={handleFilesChange}
            />
            <Divider vertical />
        </div>
    );
}

export { Add };
