import clsx from 'clsx';

import styles from './style.module.scss';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Link({ className, ...props }: LinkProps) {
    const cl = clsx(styles.link, className);

    return <a className={cl} target='_blank' rel='noopener noreferrer' {...props} />;
}

export { Link };
