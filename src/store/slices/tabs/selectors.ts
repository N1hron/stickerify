import { RootState } from '@/store';
import { Tab } from '@/types';

const selectTab = (tab: Tab) => (state: RootState) => state.tabs[tab];
const selectTabs = (state: RootState) => state.tabs;

export { selectTab, selectTabs };
