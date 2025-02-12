import { useState, useEffect } from 'react';

import { Button } from '../Button/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

import './SpinButton.scss';
import clsx from 'clsx';

type SpinButtonProps<T extends string> = {
    options: T[];
    defaultOption?: T;
    label: string;
    onChange?: (value: T) => void;
    disabled?: boolean;
    className?: string;
};

function SpinButton<T extends string>({
    options,
    defaultOption,
    label,
    disabled,
    className,
    onChange,
}: SpinButtonProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(() => {
        if (!defaultOption) return 0;
        return options.findIndex((option) => option === defaultOption);
    });
    const cl = clsx('spin-button', className);

    useEffect(() => {
        if (!onChange) return;
        onChange(options[currentIndex]);
    }, [currentIndex]);

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.code) {
            case 'ArrowUp':
            case 'ArrowRight': {
                event.preventDefault();
                setNext();
                break;
            }
            case 'ArrowDown':
            case 'ArrowLeft': {
                event.preventDefault();
                setPrev();
                break;
            }
            case 'Home': {
                event.preventDefault();
                setFirst();
                break;
            }
            case 'End': {
                event.preventDefault();
                setLast();
            }
        }
    }

    function setFirst() {
        if (disabled) return;
        setCurrentIndex(0);
    }

    function setLast() {
        if (disabled) return;
        setCurrentIndex(options.length - 1);
    }

    function setPrev() {
        if (currentIndex === 0 || disabled) return;

        const nextIndex =
            (currentIndex + (options.length - 1)) % options.length;
        setCurrentIndex(nextIndex);
    }

    function setNext() {
        if (currentIndex === options.length - 1 || disabled) return;

        const nextIndex = (currentIndex + 1) % options.length;
        setCurrentIndex(nextIndex);
    }

    const longestOptionLength = options.reduce(
        (acc, option) => Math.max(acc, option.length),
        0
    );

    const optionWidth = `${100 / options.length}%`;
    const optionsWidth = `${100 * options.length}%`;
    const optionsLeft = `-${100 * currentIndex}%`;
    const viewWidth = `calc(${longestOptionLength}ch + 1rem)`;

    return (
        <div className={cl}>
            <Button
                className='spin-button__prev'
                aria-label='Previous option'
                title='Previous option'
                tabIndex={-1}
                mini
                disabled={currentIndex === 0 || disabled}
                onClick={setPrev}
            >
                <ArrowLeftIcon role='none' />
            </Button>
            <div
                className='spin-button__view'
                role='spinbutton'
                tabIndex={disabled ? -1 : 0}
                aria-valuenow={currentIndex}
                aria-valuetext={options[currentIndex]}
                aria-valuemin={0}
                aria-valuemax={options.length - 1}
                aria-label={label}
                title={label}
                style={{ width: viewWidth, minWidth: viewWidth }}
                onKeyDown={handleKeyDown}
            >
                <div
                    className='spin-button__options'
                    style={{ width: optionsWidth, left: optionsLeft }}
                >
                    {options.map((option, i) => {
                        return (
                            <div
                                key={i}
                                className='spin-button__option'
                                style={{
                                    width: optionWidth,
                                }}
                            >
                                {option}
                            </div>
                        );
                    })}
                </div>
            </div>
            <Button
                className='spin-button__next'
                aria-label='Next option'
                title='Next option'
                tabIndex={-1}
                mini
                disabled={currentIndex === options.length - 1 || disabled}
                onClick={setNext}
            >
                <ArrowRightIcon role='none' />
            </Button>
        </div>
    );
}

export { SpinButton };
