import clsx from 'clsx';

import styles from './style.module.scss';

type CardProps<T extends React.ElementType> = {
    as: T;
    className?: string;
} & React.ComponentPropsWithoutRef<T>;

function Card<T extends React.ElementType>({ as, className, ...props }: CardProps<T>) {
    const Component: React.ElementType = as;
    const cl = clsx(styles.card, className);

    return <Component className={cl} {...props} />;
}

export { Card };
