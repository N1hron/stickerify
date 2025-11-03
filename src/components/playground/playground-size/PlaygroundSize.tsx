import { ChangeEvent, ReactNode, useMemo } from 'react';

import { PlaygroundSizeContext, usePlaygroundSizeContext } from './PlaygroundSizeContext';

import styles from '../style.module.scss';

type PlaygroundSizeProps = {
    title: string;
    width: number;
    height: number;
    setHeight?: (value: number) => void;
    setWidth?: (value: number) => void;
    children: ReactNode;
};

function PlaygroundSize({
    title,
    width,
    height,
    setWidth,
    setHeight,
    children,
}: PlaygroundSizeProps) {
    const value = useMemo(
        () => ({ title, width, height, setWidth, setHeight }),
        [title, width, height, setWidth, setHeight]
    );

    return (
        <div className={styles.size}>
            <PlaygroundSizeContext value={value}>{children}</PlaygroundSizeContext>
        </div>
    );
}

function PlaygroundSizeTitle() {
    const { title } = usePlaygroundSizeContext();

    return <div className={styles.sizeTitle}>{title}</div>;
}

type PlaygroundSizeWidthProps = {
    children: ReactNode;
};

function PlaygroundSizeWidth({ children }: PlaygroundSizeWidthProps) {
    return <div className={styles.sizeWidth}>W: {children}</div>;
}

function PlaygroundSizeWidthValue() {
    const { width } = usePlaygroundSizeContext();
    return <span className={styles.sizeWidthValue}>{width} px</span>;
}

function PlaygroundSizeWidthInput() {
    const { width, setWidth } = usePlaygroundSizeContext();

    const handleChange = setWidth
        ? (event: ChangeEvent<HTMLInputElement>) => {
              const value = getInputValue(event);
              setWidth(value);
          }
        : undefined;

    return (
        <div className={styles.sizeWidthInput}>
            <input type='text' value={width} onChange={handleChange} aria-label='Width' />
            <span>px</span>
        </div>
    );
}

type PlaygroundSizeHeightProps = {
    children: ReactNode;
};

function PlaygroundSizeHeight({ children }: PlaygroundSizeHeightProps) {
    return <div className={styles.sizeHeight}>H: {children}</div>;
}

function PlaygroundSizeHeightValue() {
    const { height } = usePlaygroundSizeContext();
    return <span className={styles.sizeHeightValue}>{height} px</span>;
}

function PlaygroundSizeHeightInput() {
    const { height, setHeight } = usePlaygroundSizeContext();

    const handleChange = setHeight
        ? (event: ChangeEvent<HTMLInputElement>) => {
              const value = getInputValue(event);
              setHeight(value);
          }
        : undefined;

    return (
        <div className={styles.sizeHeightInput}>
            <input type='text' value={height} onChange={handleChange} aria-label='Height' />
            <span>px</span>
        </div>
    );
}

function getInputValue(event: ChangeEvent<HTMLInputElement>) {
    const value = Math.max(Number.parseFloat(event.target.value), 0);

    if (value !== value) {
        return 0;
    }
    return value;
}

PlaygroundSize.Title = PlaygroundSizeTitle;
PlaygroundSize.Width = PlaygroundSizeWidth;
PlaygroundSize.Height = PlaygroundSizeHeight;
PlaygroundSize.WidthValue = PlaygroundSizeWidthValue;
PlaygroundSize.HeightValue = PlaygroundSizeHeightValue;
PlaygroundSize.WidthInput = PlaygroundSizeWidthInput;
PlaygroundSize.HeightInput = PlaygroundSizeHeightInput;

export { PlaygroundSize };
