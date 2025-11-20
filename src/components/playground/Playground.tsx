import { Card, Divider } from '@ui';

import styles from './style.module.scss';

export function Playground() {
  return (
    <Card className={styles.playground}>
      <Card.Title>Playground</Card.Title>
      <Divider />
    </Card>
  );
}
