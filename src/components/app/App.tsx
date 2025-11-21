import { Card, Link } from '@ui';
import { OutputSettings } from '../output-settings/OutputSettings';
import { Playground } from '../playground/Playground';

import styles from './style.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <Card className={styles.header} as='header'>
        <h1 className={styles.title}>Shiiru</h1>
      </Card>
      <main className={styles.main}>
        <OutputSettings />
        <Playground />
      </main>
      <Card className={styles.footer} as='footer'>
        <Link className={styles.githubLink} href='https://github.com/N1hron/stickerify'>
          GitHub page
        </Link>
      </Card>
    </div>
  );
}
