import { useAppSelector } from '../../store/hooks';
import { selectIsFilesEmpty, selectTranscoderStatus } from '../../store/slices/transcoder';
import { UploadIcon, LoadingIcon, ErrorIcon } from '../icons';
import clsx from 'clsx';

import style from './style.module.scss';

function FileListStatus() {
    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);
    const cl = clsx(style.status, style[transcoderStatus]);

    function renderIcon() {
        if (transcoderStatus === 'loading') {
            return <LoadingIcon />;
        } else if (transcoderStatus === 'ready' && isFilesEmpty) {
            return <UploadIcon />;
        } else if (transcoderStatus === 'error') {
            return <ErrorIcon />;
        }
    }

    return (
        <div className={cl} inert>
            {renderIcon()}
        </div>
    );
}

export { FileListStatus };
