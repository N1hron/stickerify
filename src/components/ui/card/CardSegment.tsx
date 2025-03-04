import clsx from 'clsx';

import styles from './style.module.scss';

type CardSegmentProps = React.HTMLAttributes<HTMLDivElement>;

function CardSegment({ className, ...props }: CardSegmentProps) {
    const cl = clsx(styles.segment, className);

    return <div className={cl} {...props} />;
}

export { CardSegment };
