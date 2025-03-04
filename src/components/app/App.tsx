import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Settings } from '../settings/Settings';

import styles from './style.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Settings />
            <main className={styles.main}></main>
            <Footer />
        </div>
    );
}

export { App };
