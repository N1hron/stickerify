import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { SettingsPanel } from '../settings-panel/SettingsPanel';

import styles from './style.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <SettingsPanel />
            <main className={styles.main}></main>
            <Footer />
        </div>
    );
}

export { App };
