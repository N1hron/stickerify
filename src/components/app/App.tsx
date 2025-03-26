import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { OutputSettings } from '../output-settings/OutputSettings';
import { FileList } from '../file-list/FileList';
import { FileActions } from '../file-actions/FileActions';

import styles from './style.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <OutputSettings />
            <main className={styles.main}>
                <FileList />
                <FileActions />
            </main>
            <Footer />
        </div>
    );
}

export { App };
