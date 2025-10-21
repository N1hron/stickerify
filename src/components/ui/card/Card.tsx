import clsx from 'clsx';

import styles from './style.module.scss';

type CardBaseProps<T extends React.ElementType> = {
    as?: T;
    className?: string;
    mini?: boolean;
};

type CardAdditionalProps<T extends React.ElementType> = Omit<
    React.ComponentPropsWithRef<T>,
    keyof CardBaseProps<T>
>;

type CardProps<T extends React.ElementType> = CardBaseProps<T> & CardAdditionalProps<T>;

function Card<T extends React.ElementType = 'div'>({
    as,
    className,
    mini,
    ...props
}: CardProps<T>) {
    const Element: React.ElementType = as || 'div';
    const cl = clsx(styles.card, mini && styles.mini, className);

    return <Element className={cl} {...props} />;
}

export { Card };
