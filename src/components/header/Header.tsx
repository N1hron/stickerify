import { Card } from '../ui';

import styles from './style.module.scss';

function Header() {
    return (
        <Card className={styles.header} as='header'>
            <h1>Stickerify</h1>
        </Card>
    );
}

export { Header };
