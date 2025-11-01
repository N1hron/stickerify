import { OutputSettings } from '../output-settings/OutputSettings';
import { Card } from '../ui/card/Card';

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
    </div>
  );
}
