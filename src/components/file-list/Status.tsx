import clsx from 'clsx';

import { useAppSelector } from '@store/hooks';
import { selectIsFilesEmpty, selectTranscoderStatus } from '@slices/transcoder';
import { UploadIcon, LoadingIcon, ErrorIcon } from '@components/icons';

import style from './style.module.scss';

function Status() {
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

export { Status };
