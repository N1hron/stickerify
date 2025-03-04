import { useState, useId, useEffect } from 'react';

import clsx from 'clsx';

import { Label, Button } from '../../ui';
import { ArrowLeftIcon } from '../../icons';

import styles from './style.module.scss';

type SpinButtonProps<T extends string> = {
    label: string;
    options: T[];
    value?: T;
    disabled?: boolean;
    onChange?: (option: T) => void;
    className?: string;
};

function SpinButton<T extends string>({
    label,
    options,
    value,
    disabled,
    onChange,
    className,
}: SpinButtonProps<T>) {
    const valueIndex = value ? options.indexOf(value) : -1;
    const [currentIndex, setCurrentIndex] = useState(() => {
        return valueIndex > -1 ? valueIndex : 0;
    });
    const labelId = useId();
    const cl = clsx(styles.spinButton, disabled && styles.disabled, className);

    useEffect(() => {
        if (valueIndex >= 0) {
            setCurrentIndex(valueIndex);
        }
    }, [valueIndex]);

    useEffect(() => {
        if (onChange) {
            onChange(options[currentIndex]);
        }
    }, [currentIndex]);

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft': {
                prev();
                break;
            }
            case 'ArrowUp':
            case 'ArrowRight': {
                next();
                break;
            }
        }
    }

    function prev() {
        if (disabled) return;
        const next = (currentIndex - 1 + options.length) % options.length;
        setCurrentIndex(next);
    }

    function next() {
        if (disabled) return;
        const next = (currentIndex + 1) % options.length;
        setCurrentIndex(next);
    }

    return (
        <div className={cl}>
            <Label id={labelId} as='span'>
                {label}
            </Label>
            <div className={styles.wrapper}>
                <Button
                    tabIndex={-1}
                    aria-label='Previous option'
                    mini
                    color='accent'
                    disabled={disabled}
                    onClick={prev}
                >
                    <ArrowLeftIcon aria-hidden />
                </Button>
                <div
                    className={styles.view}
                    role='spinbutton'
                    aria-labelledby={labelId}
                    aria-valuenow={currentIndex + 1}
                    aria-valuetext={options[currentIndex]}
                    aria-valuemin={1}
                    aria-valuemax={options.length}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className={styles.options}
                        style={{ width: `${options.length}00%`, left: `-${currentIndex}00%` }}
                    >
                        {options.map((option, i) => (
                            <div key={i} className={styles.option}>
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    tabIndex={-1}
                    aria-label='Next option'
                    mini
                    color='accent'
                    disabled={disabled}
                    onClick={next}
                >
                    <ArrowLeftIcon className={styles.iconRight} aria-hidden />
                </Button>
            </div>
        </div>
    );
}

export { SpinButton };
