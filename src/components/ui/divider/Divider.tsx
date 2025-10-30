import clsx from 'clsx';

import styles from './style.module.scss';

type DividerProps = {
    disableMargin?: boolean;
    vertical?: boolean;
    className?: string;
};

function Divider({ disableMargin = false, vertical = false, className }: DividerProps) {
    const cl = clsx(
        styles.divider,
        vertical && styles.vertical,
        disableMargin && styles.disableMargin,
        className
    );

    return <div className={cl} />;
}

export { Divider };
