import { useState, useId, useEffect } from 'react';
import clsx from 'clsx';

import { Label, Button } from '../';
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
    const [currentOptionIndex, setCurrentOptionIndex] = useState(() => {
        if (!value) return 0;
        return options.indexOf(value);
    });

    const labelId = useId();
    const cl = clsx(styles.spinButton, disabled && styles.disabled, className);

    useEffect(() => {
        if (!value) return;
        setCurrentOptionIndex(options.indexOf(value));
    }, [value]);

    useEffect(() => {
        if (onChange) {
            onChange(options[currentOptionIndex]);
        }
    }, [currentOptionIndex]);

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
        const next = (currentOptionIndex - 1 + options.length) % options.length;
        setCurrentOptionIndex(next);
    }

    function next() {
        if (disabled) return;
        const next = (currentOptionIndex + 1) % options.length;
        setCurrentOptionIndex(next);
    }

    return (
        <div className={cl}>
            <Label className={styles.label} id={labelId} as='span'>
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
                    aria-valuenow={currentOptionIndex + 1}
                    aria-valuetext={options[currentOptionIndex]}
                    aria-valuemin={1}
                    aria-valuemax={options.length}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className={styles.options}
                        style={{ width: `${options.length}00%`, left: `-${currentOptionIndex}00%` }}
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
