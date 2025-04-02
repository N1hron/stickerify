import { Logo } from '@components/logo/Logo';
import { OutputSettings } from '@components/output-settings/OutputSettings';
import { GithubLink } from '@components/github-link/GithubLink';
import { Transcoder } from '@/components/transcoder/Transcoder';

import styles from './style.module.scss';

function App() {
    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <div className={styles.sidebar}>
                    <Logo />
                    <OutputSettings />
                    <GithubLink />
                </div>
                <Transcoder />
            </main>
        </div>
    );
}

export { App };
