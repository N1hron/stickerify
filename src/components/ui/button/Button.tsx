import clsx from 'clsx';

import styles from './style.module.scss';

type ButtonProps = {
    color?: 'accent' | 'success' | 'danger';
    mini?: boolean;
    pressed?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ color = 'accent', mini, pressed, className, ...props }: ButtonProps) {
    const cl = clsx(
        styles.button,
        styles[color],
        mini && styles.mini,
        pressed && styles.pressed,
        className
    );

    return (
        <div className={cl}>
            <button {...props}></button>
        </div>
    );
}

export { Button };
