import clsx from 'clsx';
import styles from './style.module.scss';

type DividerProps = {
    horizontal?: boolean;
};

function Divider({ horizontal }: DividerProps) {
    const cl = clsx(styles.divider, horizontal && styles.horizontal);

    return <div className={cl} aria-hidden></div>;
}

export { Divider };
