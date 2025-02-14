import { useEffect } from 'react';

import { SpinButton } from '../ui';
import { Checkbox } from '../ui';
import { StickerMotionType, StickerSizeType, StickerType } from '../../types';
import { useStickerType, useLocalStorage } from '../../hooks';

import './SelectStickerType.scss';

function SelectStickerType() {
    const [stickerType, setStickerType, setStickerTypeLS, removeStickerTypeLS] =
        useStickerType();
    const [rememberStickerType, setRememberStickerType] = useLocalStorage(
        'rememberStickerType',
        false
    );

    const saveToLocalStorage = rememberStickerType === true;

    useEffect(() => {
        if (!saveToLocalStorage) {
            removeStickerTypeLS();
        } else {
            setStickerTypeLS(stickerType);
        }
    }, [saveToLocalStorage]);

    function updateStickerType(newStickerType: StickerType) {
        setStickerType(newStickerType);
        if (saveToLocalStorage) {
            setStickerTypeLS(newStickerType);
        }
    }

    function handleMotionTypeChange(motion: StickerMotionType) {
        const newStickerType = { ...stickerType, motion };
        updateStickerType(newStickerType);
    }

    function handleSizeTypeChange(size: StickerSizeType) {
        const newStickerType = { ...stickerType, size };
        updateStickerType(newStickerType);
    }

    function handleCheckboxChange(isChecked: boolean) {
        setRememberStickerType(isChecked);
    }

    return (
        <div className='select-sticker-type'>
            <div className='select-sticker-type__spin-buttons'>
                <SpinButton<StickerMotionType>
                    className='select-sticker-type__spin-button'
                    label='Motion type'
                    options={['static', 'video', 'animated']}
                    defaultOption={stickerType.motion}
                    onChange={handleMotionTypeChange}
                />
                <SpinButton<StickerSizeType>
                    className='select-sticker-type__spin-button'
                    label='Size type'
                    options={['sticker', 'emoji']}
                    defaultOption={stickerType.size}
                    onChange={handleSizeTypeChange}
                />
            </div>
            <Checkbox
                label='Remember choice'
                defaultChecked={saveToLocalStorage}
                onChange={handleCheckboxChange}
            />
        </div>
    );
}

export { SelectStickerType };
