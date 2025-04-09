import clsx from 'clsx';

import styles from './style.module.scss';

type ButtonProps = {
    color?: 'accent' | 'success' | 'danger';
    mini?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ color = 'accent', mini, className, ...props }: ButtonProps) {
    const cl = clsx(styles.button, styles[color], mini && styles.mini, className);

    return (
        <div className={styles.buttonWrapper}>
            <button className={cl} {...props}></button>
        </div>
    );
}

export { Button };
