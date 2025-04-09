import { AppMiddleware } from '@store';
import { isPayloadAction } from '@utils';
import { TranscoderFile } from '@types';

const preventFileDuplicates: AppMiddleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        if (action.type === 'transcoder/addFiles' && Array.isArray(action.payload)) {
            const existingFiles = getState().transcoder.files;

            action.payload = (action.payload as TranscoderFile[]).filter((file) => {
                return !existingFiles.find((existingFile) => {
                    return (
                        file.input.name === existingFile.input.name &&
                        file.input.size === existingFile.input.size
                    );
                });
            });
        }

        next(action);
    };

export { preventFileDuplicates };
