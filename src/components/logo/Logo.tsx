import { Card } from '@ui';

import styles from './style.module.scss';

function Logo() {
    return (
        <Card className={styles.logo} as='header'>
            <h1>Stickerify</h1>
        </Card>
    );
}

export { Logo };
