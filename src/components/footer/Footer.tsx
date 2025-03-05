import { Card, Link } from '../ui';

import styles from './style.module.scss';

function Footer() {
    return (
        <Card className={styles.footer} as='footer'>
            <Link href='https://github.com/N1hron/stickerify' aria-label='GitHub'>
                GitHub page
            </Link>
        </Card>
    );
}

export { Footer };
