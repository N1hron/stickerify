import clsx from 'clsx';

import './Button.scss';

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    mini?: boolean;
    filled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
    children,
    className = '',
    mini,
    filled,
    ...props
}: ButtonProps) {
    const cl = clsx(
        'button',
        className,
        mini && 'button_mini',
        filled && 'button_filled'
    );

    return (
        <button className={cl} {...props}>
            {children}
        </button>
    );
}

export { Button };
