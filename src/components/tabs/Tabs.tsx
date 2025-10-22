import { useEffect } from 'react';

import { Tab } from './Tab';
import { SettingsIcon } from '../icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useAppDispatch } from '@/store/hooks';
import { setTabs } from '@/store/slices/tabs';

import styles from './style.module.scss';

export type TabValue = 'Settings' | 'Playground' | 'Transcoder';

function Tabs() {
    const dispatch = useAppDispatch();

    const smallScreenSize = useMediaQuery('(max-width: 30em)');
    const mediumScreenSize = useMediaQuery('(max-width: 47em)') && !smallScreenSize;
    const largeScreenSize = !smallScreenSize && !mediumScreenSize;
    const showSettingsIcon = useMediaQuery('(max-width: 25em)');

    useEffect(() => {
        dispatch(
            setTabs({
                settings: true,
                playground: largeScreenSize || mediumScreenSize,
                transcoder: largeScreenSize,
            })
        );
    }, [smallScreenSize, mediumScreenSize, largeScreenSize]);

    if (largeScreenSize) return null;
    return (
        <div className={styles.tabs}>
            {mediumScreenSize ? (
                <Tab tabNames={['settings', 'playground']}>Settings & Playground</Tab>
            ) : (
                <>
                    <Tab tabNames={['settings']}>
                        {showSettingsIcon ? <SettingsIcon /> : 'Settings'}
                    </Tab>
                    <Tab tabNames={['playground']}>Playground</Tab>
                </>
            )}

            <Tab tabNames={['transcoder']}>Transcoder</Tab>
        </div>
    );
}

export { Tabs };
