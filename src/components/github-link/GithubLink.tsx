import { Card, Link } from '@components/ui';

import styles from './style.module.scss';

function GithubLink() {
    return (
        <Card className={styles.githubLink}>
            <Link href='https://github.com/N1hron/stickerify' aria-label='GitHub'>
                GitHub page
            </Link>
        </Card>
    );
}

export { GithubLink };
