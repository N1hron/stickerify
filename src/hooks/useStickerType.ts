import { useContext } from 'react';

import { StickerTypeContext } from '../context';

function useStickerType() {
    return useContext(StickerTypeContext)!;
}

export { useStickerType };
