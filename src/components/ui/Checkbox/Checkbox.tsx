import { useId } from 'react';
import clsx from 'clsx';

import { CheckIcon } from '../../icons';

import './Checkbox.scss';

type CheckboxType = {
    label: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    className?: string;
    onChange?: (isChecked: boolean) => void;
};

function Checkbox({
    label,
    defaultChecked,
    disabled,
    className,
    onChange,
}: CheckboxType) {
    const inputId = useId();
    const cl = clsx('checkbox', className);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!onChange) return;
        onChange(event.target.checked);
    }

    return (
        <div className={cl}>
            <div className='checkbox__input-wrapper'>
                <input
                    className='checkbox__input'
                    id={inputId}
                    type='checkbox'
                    disabled={disabled}
                    defaultChecked={defaultChecked}
                    onChange={handleChange}
                />
                <CheckIcon className='checkbox__icon' role='none' />
            </div>
            <label className='checkbox__label' htmlFor={inputId}>
                {label}
            </label>
        </div>
    );
}

export { Checkbox };
