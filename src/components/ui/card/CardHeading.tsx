import clsx from 'clsx';

import styles from './style.module.scss';

type CardHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

function CardHeading({ className, ...props }: CardHeadingProps) {
    const cl = clsx(styles.heading, className);

    return <h2 className={cl} {...props}></h2>;
}

export { CardHeading };
