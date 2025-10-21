import { useId } from 'react';
import clsx from 'clsx';

import { TranscoderFileStatus } from '@types';
import { CheckIcon, DoubleCheckIcon, ErrorIcon, LoadingIcon } from '@icons';
import { Tooltip } from '@ui';

import styles from './style.module.scss';

type StatusListItemProps = {
    status: TranscoderFileStatus;
    message?: string;
};

function StatusListItem({ status, message }: StatusListItemProps) {
    const id = useId();
    const cl = clsx(styles.statusListItem, styles[status]);

    function renderIcon() {
        switch (status) {
            case 'ready':
                return <CheckIcon />;
            case 'transcoding':
                return <LoadingIcon />;
            case 'success':
                return <DoubleCheckIcon />;
            case 'error':
                return <ErrorIcon />;
        }
    }

    function renderTooltipContent() {
        switch (status) {
            case 'ready':
                return 'UPLOADED';
            case 'transcoding':
                return 'TRANSCODING';
            case 'success':
                return 'TRANSCODED';
            case 'error':
                return message ? message.toUpperCase() : 'ERROR';
        }
    }

    return (
        <li className={cl} id={id}>
            {renderIcon()}
            <Tooltip targetId={id}>{renderTooltipContent()}</Tooltip>
        </li>
    );
}

export { StatusListItem };
