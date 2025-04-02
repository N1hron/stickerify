import clsx from 'clsx';

import { TranscoderFileStatus } from '@/types';
import { CheckIcon, DoubleCheckIcon, ErrorIcon, LoadingIcon } from '@components/icons';

import styles from '../style.module.scss';

type StatusListItemProps = {
    status: TranscoderFileStatus;
};

function StatusListItem({ status }: StatusListItemProps) {
    const cl = clsx(styles.statusListItem, styles[status]);

    function renderIcon() {
        switch (status) {
            case 'idle':
                return <CheckIcon />;
            case 'transcoding':
                return <LoadingIcon />;
            case 'success':
                return <DoubleCheckIcon />;
            case 'error':
                return <ErrorIcon />;
        }
    }

    return <li className={cl}>{renderIcon()}</li>;
}

export { StatusListItem };
