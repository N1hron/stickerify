import clsx from 'clsx';

import styles from './style.module.scss';

type LabelProps<T extends 'label' | 'span'> = {
    as?: T;
} & React.ComponentPropsWithoutRef<T>;

function Label<T extends 'label' | 'span' = 'label'>({ as, className, ...props }: LabelProps<T>) {
    const Element = as || 'label';
    const cl = clsx(styles.label, className);

    return <Element className={cl} {...props}></Element>;
}

export { Label };
