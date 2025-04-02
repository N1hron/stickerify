import clsx from 'clsx';

import { useAppSelector } from '@store/hooks';
import { selectIsFilesEmpty, selectTranscoderStatus } from '@slices/transcoder';
import { UploadIcon, LoadingIcon, ErrorIcon } from '@components/icons';

import style from './style.module.scss';

function TranscoderStatus() {
    const transcoderStatus = useAppSelector(selectTranscoderStatus);
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);

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
        <div className={style.status} inert>
            <div className={clsx(style.statusIcon, style[transcoderStatus])}>{renderIcon()}</div>
        </div>
    );
}

export { TranscoderStatus };
