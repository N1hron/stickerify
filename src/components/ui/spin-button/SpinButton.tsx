import { useState, useId } from 'react';
import clsx from 'clsx';

import { Label, Button } from '@components/ui';
import { ArrowIcon } from '@components/icons';

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
    const labelId = useId();
    const cl = clsx(styles.spinButton, disabled && styles.disabled, className);

    const valueIndex = value ? options.indexOf(value) : -1;
    const [current, setCurrent] = useState<number>(() => (valueIndex === -1 ? 0 : valueIndex));
    const prev = (current - 1 + options.length) % options.length;
    const next = (current + 1) % options.length;

    if (value && value !== options[current]) {
        if (valueIndex !== -1) setCurrent(valueIndex);
    }

    function updateCurrent(value: number) {
        setCurrent(value);
        if (onChange) onChange(options[value]);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft': {
                updateCurrent(prev);
                break;
            }
            case 'ArrowUp':
            case 'ArrowRight': {
                updateCurrent(next);
                break;
            }
        }
    }

    return (
        <div className={cl}>
            <Label className={styles.label} id={labelId} as='span'>
                {label}
            </Label>
            <div className={styles.wrapper}>
                <Button
                    aria-hidden
                    tabIndex={-1}
                    aria-label='Previous option'
                    mini
                    color='accent'
                    disabled={disabled}
                    onClick={() => updateCurrent(prev)}
                >
                    <ArrowIcon className={styles.icon} />
                </Button>
                <div
                    className={styles.view}
                    role='spinbutton'
                    aria-labelledby={labelId}
                    aria-valuenow={current + 1}
                    aria-valuetext={options[current]}
                    aria-valuemin={1}
                    aria-valuemax={options.length}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    onKeyDown={handleKeyDown}
                >
                    <div
                        className={styles.options}
                        style={{ width: `${options.length}00%`, left: `-${current}00%` }}
                    >
                        {options.map((option, i) => (
                            <div key={i} className={styles.option}>
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    aria-hidden
                    tabIndex={-1}
                    aria-label='Next option'
                    mini
                    color='accent'
                    disabled={disabled}
                    onClick={() => updateCurrent(next)}
                >
                    <ArrowIcon className={clsx(styles.icon, styles.iconRight)} />
                </Button>
            </div>
        </div>
    );
}

export { SpinButton };
