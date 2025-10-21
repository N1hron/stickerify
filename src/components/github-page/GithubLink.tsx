import { Card, Link } from '@ui';

import styles from './style.module.scss';

function GithubPage() {
    return (
        <Card className={styles.githubPage} as='footer'>
            <Link href='https://github.com/N1hron/stickerify' aria-label='GitHub'>
                GitHub page
            </Link>
        </Card>
    );
}

export { GithubPage };
