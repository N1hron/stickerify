import { Card } from '../ui';
import { ConverterUploader } from './ConverterUploader';

import styles from './style.module.scss';

export function Converter() {
  return (
    <Card className={styles.converter}>
      <ConverterUploader />
    </Card>
  );
}
