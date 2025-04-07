import { AppMiddleware } from '@store';
import { isPayloadAction } from '@utils';
import { removeAllFiles } from '@slices/transcoder';

const syncTranscoderWithSettings: AppMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        const [slice] = action.type.split('/');

        if (slice === 'settings') {
            const oldStickerMotionType = getState().settings.items.stickerMotionType;

            next(action);

            const filesEmpty = getState().transcoder.files.length === 0;
            const newStickerMotionType = getState().settings.items.stickerMotionType;

            if (oldStickerMotionType !== newStickerMotionType && !filesEmpty) {
                dispatch(removeAllFiles());
            }
        } else {
            next(action);
        }
    };

export { syncTranscoderWithSettings };
