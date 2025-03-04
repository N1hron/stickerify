import styles from './style.module.scss';

type DividerProps = {
    label?: string;
};

function Divider({ label }: DividerProps) {
    return (
        <div className={styles.divider} aria-hidden>
            <div className={styles.line}></div>
            {label && <span className={styles.label}>{label}</span>}
        </div>
    );
}

export { Divider };
