import { AppMiddleware } from '..';
import { isPayloadAction } from '../../utils';
import { removeAllFiles } from '../slices/transcoder';

const syncWithSettings: AppMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);
        const [slice] = action.type.split('/');

        if (slice === 'settings') {
            const oldStickerMotion = getState().settings.items.stickerMotion;

            next(action);

            const filesEmpty = getState().transcoder.files.length === 0;
            const newStickerMotion = getState().settings.items.stickerMotion;

            if (oldStickerMotion !== newStickerMotion && !filesEmpty) {
                dispatch(removeAllFiles());
            }
        } else {
            next(action);
        }
    };

export { syncWithSettings };
