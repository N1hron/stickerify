import { AppMiddleware } from '..';
import { isPayloadAction } from '../../utils';
import { FileData } from '../../types';

const preventFileDuplicates: AppMiddleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        if (!isPayloadAction(action)) return next(action);

        if (action.type === 'transcoder/addFiles' && Array.isArray(action.payload)) {
            const existingFiles = getState().transcoder.files;

            action.payload = (action.payload as FileData[]).filter((file) => {
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
