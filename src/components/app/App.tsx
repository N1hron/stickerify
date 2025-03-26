import { Logo } from '@components/logo/Logo';
import { OutputSettings } from '@components/output-settings/OutputSettings';
import { GithubLink } from '@components/github-link/GithubLink';
import { FileList } from '@components/file-list/FileList';
import { Actions } from '@components/actions/Actions';

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
                <div className={styles.transcoder}>
                    <FileList />
                    <Actions />
                </div>
            </main>
        </div>
    );
}

export { App };
