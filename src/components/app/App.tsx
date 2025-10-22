import { Logo } from '@components/logo/Logo';
import { Tabs } from '../tabs/Tabs';
import { Settings } from '@components/settings/Settings';
import { Playground } from '../playground/Playground';
import { GithubPage } from '@components/github-page/GithubLink';
import { Transcoder } from '@components/transcoder/Transcoder';
import { useAppSelector } from '@/store/hooks';
import { selectTabs } from '@/store/slices/tabs';

import styles from './style.module.scss';

function App() {
    const tabs = useAppSelector(selectTabs);

    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                <Logo />
                <Tabs />
                {tabs.settings && <Settings />}
                {tabs.playground && <Playground />}
                {tabs.transcoder && <Transcoder />}
                <GithubPage />
            </main>
        </div>
    );
}

export { App };
