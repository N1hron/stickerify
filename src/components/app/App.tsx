import { Logo } from '@components/logo/Logo';
import { Settings } from '@components/settings/Settings';
import { Playground } from '../playground/Playground';
import { GithubPage } from '@components/github-page/GithubLink';
import { Transcoder } from '@components/transcoder/Transcoder';

import styles from './style.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <Sidebar />
                <Transcoder />
            </main>
        </div>
    );
}

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <Settings />
            <Playground />
            <GithubPage />
        </div>
    );
}

export { App };
