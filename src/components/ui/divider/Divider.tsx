import clsx from 'clsx';

import styles from './style.module.scss';

type DividerProps = {
    vertical?: boolean;
};

function Divider({ vertical }: DividerProps) {
    const cl = clsx(styles.divider, vertical && styles.vertical);

    return <div className={cl} aria-hidden></div>;
}

export { Divider };
