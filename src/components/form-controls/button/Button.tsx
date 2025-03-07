import clsx from 'clsx';
import styles from './style.module.scss';

type ButtonProps = {
    color?: 'accent' | 'success' | 'danger';
    mini?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ color, mini, className, ...props }: ButtonProps) {
    const cl = clsx(
        styles.button,
        mini && styles.mini,
        color && `${styles.colored} ${styles[color]}`,
        className
    );

    return <button className={cl} {...props}></button>;
}

export { Button };
