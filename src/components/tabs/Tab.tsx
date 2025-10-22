import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';

import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTabs, setTabs } from '@/store/slices/tabs';
import { Tab as TabType } from '@/types';

import styles from './style.module.scss';

type TabProps = {
    children: ReactNode;
    tabNames: TabType[];
};

function Tab({ children, tabNames }: TabProps) {
    const tabs = useAppSelector(selectTabs);
    const dispatch = useAppDispatch();

    const isPressed = useMemo(() => {
        for (const tabName of tabNames) {
            if (!tabs[tabName]) {
                return false;
            }
        }

        return true;
    }, [tabs.settings, tabs.playground, tabs.transcoder]);

    const cl = clsx(styles.tab, isPressed && styles.tabPressed);

    function handleClick() {
        const nextTabs = {
            settings: false,
            playground: false,
            transcoder: false,
        };

        for (const tabName of tabNames) {
            nextTabs[tabName] = true;
        }

        dispatch(setTabs(nextTabs));
    }

    return (
        <Button className={cl} disabled={isPressed} pressed={isPressed} onClick={handleClick}>
            {children}
        </Button>
    );
}

export { Tab };
