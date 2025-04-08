import { useId } from 'react';
import clsx from 'clsx';

import { TranscoderFileStatus } from '@/types';
import { CheckIcon, DoubleCheckIcon, ErrorIcon, LoadingIcon } from '@components/icons';
import { Tooltip } from '@/components/ui';

import styles from '../style.module.scss';

type StatusListItemProps = {
    status: TranscoderFileStatus;
};

function StatusListItem({ status }: StatusListItemProps) {
    const id = useId();
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

    function renderTooltipContent() {
        switch (status) {
            case 'idle':
                return 'UPLOADED';
            case 'transcoding':
                return 'TRANSCODING';
            case 'success':
                return 'TRANSCODED';
            case 'error':
                return 'ERROR';
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
