import { Card, Divider } from '@ui';

import styles from './style.module.scss';

export function Results() {
  return (
    <Card as='section' className={styles.results}>
      <Card.Title>Results</Card.Title>
      <Divider />
    </Card>
  );
}
