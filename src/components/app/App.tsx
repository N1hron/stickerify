import { Logo } from '@components/logo/Logo';
import { OutputSettings } from '@components/output-settings/OutputSettings';
import { GithubPage } from '@/components/github-page/GithubLink';
import { Transcoder } from '@/components/transcoder/Transcoder';

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
            <OutputSettings />
            <GithubPage />
        </div>
    );
}

export { App };
