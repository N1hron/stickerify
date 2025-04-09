import clsx from 'clsx';

import { useAppSelector } from '@store/hooks';
import { selectIsFilesEmpty, selectTranscoderStatus } from '@slices/transcoder';
import { UploadIcon, LoadingIcon, ErrorIcon } from '@icons';

import style from './style.module.scss';

function TranscoderStatus() {
    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);
    const cl = clsx(style.status, style[transcoderStatus]);

    function renderIcon() {
        switch (transcoderStatus) {
            case 'loading':
                return <LoadingIcon />;
            case 'ready':
                return <UploadIcon />;
            case 'error':
                return <ErrorIcon />;
            default:
                return null;
        }
    }

    if (!isFilesEmpty || transcoderStatus === 'idle') return null;
    return (
        <div className={cl} inert>
            {renderIcon()}
        </div>
    );
}

export { TranscoderStatus };
