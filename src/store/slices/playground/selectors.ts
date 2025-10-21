import { RootState } from '@/store';

const selectPlaygroundSourceWidth = (state: RootState) => state.playground.sourceSize.width;
const selectPlaygroundSourceHeight = (state: RootState) => state.playground.sourceSize.height;

export { selectPlaygroundSourceWidth, selectPlaygroundSourceHeight };
