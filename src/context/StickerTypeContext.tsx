import { createContext, useState } from 'react';

import { useLocalStorage } from '../hooks';
import { StickerType } from '../types';
import { isStickerType } from '../utils';

const StickerTypeContext = createContext<
    | [
          StickerType,
          React.Dispatch<React.SetStateAction<StickerType>>,
          React.Dispatch<StickerType>,
          () => void,
      ]
    | null
>(null);

type StickerTypeProviderProps = {
    children?: React.ReactNode;
};

function StickerTypeProvider({ children }: StickerTypeProviderProps) {
    const [stickerTypeLS, setStickerTypeLS, removeStickerTypeLS] =
        useLocalStorage('stickerType');
    const [stickerType, setStickerType] = useState<StickerType>(() => {
        if (isStickerType(stickerTypeLS)) return stickerTypeLS;
        return {
            motion: 'static',
            size: 'sticker',
        };
    });

    return (
        <StickerTypeContext.Provider
            value={[
                stickerType,
                setStickerType,
                setStickerTypeLS,
                removeStickerTypeLS,
            ]}
        >
            {children}
        </StickerTypeContext.Provider>
    );
}

export { StickerTypeContext, StickerTypeProvider };
