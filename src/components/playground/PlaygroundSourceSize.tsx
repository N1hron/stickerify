import { useCallback } from 'react';

import { PlaygroundSize } from './playground-size/PlaygroundSize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    selectPlaygroundSourceHeight,
    selectPlaygroundSourceWidth,
    setPlaygroundSourceSizeHeight,
    setPlaygroundSourceSizeWidth,
} from '@/store/slices/playground';

function PlaygroundSourceSize() {
    const dispatch = useAppDispatch();
    const sourceWidth = useAppSelector(selectPlaygroundSourceWidth);
    const sourceHeight = useAppSelector(selectPlaygroundSourceHeight);

    const setSourceWidth = useCallback(
        (value: number) => {
            dispatch(setPlaygroundSourceSizeWidth(value));
        },
        [dispatch]
    );

    const setSourceHeight = useCallback(
        (value: number) => {
            dispatch(setPlaygroundSourceSizeHeight(value));
        },
        [dispatch]
    );

    return (
        <PlaygroundSize
            title='Source size'
            width={sourceWidth}
            height={sourceHeight}
            setWidth={setSourceWidth}
            setHeight={setSourceHeight}
        >
            <PlaygroundSize.Title />
            <PlaygroundSize.Width>
                <PlaygroundSize.WidthInput />
            </PlaygroundSize.Width>
            <PlaygroundSize.Height>
                <PlaygroundSize.HeightInput />
            </PlaygroundSize.Height>
        </PlaygroundSize>
    );
}

export { PlaygroundSourceSize };
