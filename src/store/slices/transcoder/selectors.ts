import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';

export const selectAllFiles = (state: RootState) => {
    return state.transcoder.files;
};

export const selectTranscoderStatus = (state: RootState) => {
    return state.transcoder.status;
};

export const selectIsAllFilesSelected = (state: RootState) => {
    const files = state.transcoder.files;

    if (files.length === 0) return false;
    return files.every((file) => file.isSelected === true);
};

export const selectIsFilesEmpty = (state: RootState) => {
    return state.transcoder.files.length === 0;
};

export const selectSelectedFiles = createSelector([selectAllFiles], (files) =>
    files.filter((file) => file.isSelected)
);

export const selectAllowTranscode = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return !!selectedFiles.length && transcoderStatus === 'ready';
    }
);

export const selectAllowDownload = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return (
            !!(selectedFiles.length && selectedFiles.every((file) => file.output.url)) &&
            transcoderStatus === 'ready'
        );
    }
);

export const selectAllowRemove = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return !!selectedFiles.length && transcoderStatus === 'ready';
    }
);

export const selectDownloadData = createSelector([selectSelectedFiles], (selectedFiles) => {
    return selectedFiles
        .map((file) => {
            const { name, ext, url } = file.output;

            if (name && ext && url) {
                return {
                    fileName: `${name}.${ext}`,
                    url,
                };
            }
        })
        .filter((data) => data != undefined);
});
