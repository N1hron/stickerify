import clsx from 'clsx';

import styles from './style.module.scss';

type LabelProps<T extends 'label' | 'span'> = {
    as?: T;
} & React.ComponentPropsWithoutRef<T>;

function Label<T extends 'label' | 'span' = 'label'>({ as, className, ...props }: LabelProps<T>) {
    const Component = as || 'label';
    const cl = clsx(styles.label, className);

    return <Component className={cl} {...props}></Component>;
}

export { Label };
