import { Card, Divider } from '@ui';

import styles from './style.module.scss';

export function Playground() {
  return (
    <Card as='section' className={styles.playground}>
      <Card.Title>Playground</Card.Title>
      <Divider />
      empty for now
    </Card>
  );
}
