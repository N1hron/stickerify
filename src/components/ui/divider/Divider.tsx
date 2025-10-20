import clsx from 'clsx';

import styles from './style.module.scss';

type DividerProps = {
    disableMargin?: boolean;
};

function Divider({ disableMargin = false }: DividerProps) {
    const cl = clsx(styles.divider, disableMargin && styles.disableMargin);

    return <div className={cl} />;
}

export { Divider };
