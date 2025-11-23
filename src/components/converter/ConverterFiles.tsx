import styles from './style.module.scss';

export function ConverterFiles() {
  return (
    <table className={styles.files}>
      <thead>
        <tr>
          <th>№</th>
          <th>Name</th>
          <th>Ext</th>
          <th></th>
        </tr>
      </thead>
    </table>
  );
}
