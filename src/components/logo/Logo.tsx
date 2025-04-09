import { Card } from '@ui';

import styles from './style.module.scss';

function Logo() {
    return (
        <Card className={styles.logo}>
            <h1>Stickerify</h1>
        </Card>
    );
}

export { Logo };
