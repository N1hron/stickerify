import { createContext, use } from 'react';

type PlaygroundSizeContextValue = {
    title: string;
    width: number;
    height: number;
    setHeight?: (value: number) => void;
    setWidth?: (value: number) => void;
};

const PlaygroundSizeContext = createContext<PlaygroundSizeContextValue>({
    title: 'Sizes',
    width: 0,
    height: 0,
});

function usePlaygroundSizeContext() {
    return use(PlaygroundSizeContext);
}

export { PlaygroundSizeContext, usePlaygroundSizeContext };
