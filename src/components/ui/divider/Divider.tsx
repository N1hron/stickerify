import clsx from 'clsx';

import styles from './style.module.scss';

type DividerProps = {
    disableMargin?: boolean;
    vertical?: boolean;
};

function Divider({ disableMargin = false, vertical = false }: DividerProps) {
    const cl = clsx(
        styles.divider,
        vertical && styles.vertical,
        disableMargin && styles.disableMargin
    );

    return <div className={cl} />;
}

export { Divider };
