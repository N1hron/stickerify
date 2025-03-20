import { AppMiddleware } from '..';
import { isPayloadAction } from '../../utils';
import { clearFiles } from '../slices/files';

const syncWithSettings: AppMiddleware =
    ({ getState, dispatch }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        if (action.type === 'settings/setSetting' && Array.isArray(action.payload)) {
            next(action);

            if (action.payload[0] === 'stickerMotion' && getState().files.items.length > 0) {
                dispatch(clearFiles());
            }
        } else {
            next(action);
        }
    };

export { syncWithSettings };
