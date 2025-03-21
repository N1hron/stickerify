import { useAppSelector } from '../../store/hooks';
import { selectIsFilesEmpty, selectTranscoderStatus } from '../../store/slices/transcoder';
import { UploadIcon, LoadingIcon, ErrorIcon } from '../icons';
import clsx from 'clsx';

import style from './style.module.scss';

function FileListStatus() {
    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);

    if (transcoderStatus === 'loading') {
        return <LoadingIcon className={clsx(style.status, style.loading)} aria-hidden />;
    } else if (transcoderStatus === 'success' && isFilesEmpty) {
        return <UploadIcon className={style.status} aria-hidden />;
    } else if (transcoderStatus === 'error') {
        return <ErrorIcon className={style.status} aria-hidden />;
    }

    return null;
}

export { FileListStatus };
