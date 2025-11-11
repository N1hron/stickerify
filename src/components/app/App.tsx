import { Card, Link } from '@ui';
import { OutputSettings } from '../output-settings/OutputSettings';

import styles from './style.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <Card className={styles.header} as='header'>
        <h1 className={styles.title}>Shiiru</h1>
      </Card>
      <main className={styles.main}>
        <OutputSettings />
      </main>
      <Card className={styles.footer} as='footer'>
        <Link href='https://github.com/N1hron/stickerify'>GitHub page</Link>
      </Card>
    </div>
  );
}
