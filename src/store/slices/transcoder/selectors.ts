import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';

const selectAllFiles = (state: RootState) => {
    return state.transcoder.files;
};

const selectTranscoderStatus = (state: RootState) => {
    return state.transcoder.status;
};

const selectIsAllFilesSelected = (state: RootState) => {
    const files = state.transcoder.files;

    if (files.length === 0) return false;
    return files.every((file) => file.isSelected === true);
};

const selectIsFilesEmpty = (state: RootState) => {
    return state.transcoder.files.length === 0;
};

const selectSelectedFiles = createSelector([selectAllFiles], (files) =>
    files.filter((file) => file.isSelected)
);

const selectAllowTranscode = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return !!selectedFiles.length && transcoderStatus === 'ready';
    }
);

const selectAllowDownload = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return (
            !!(selectedFiles.length && selectedFiles.every((file) => file.output.url)) &&
            transcoderStatus === 'ready'
        );
    }
);

const selectAllowRemove = createSelector(
    [selectSelectedFiles, selectTranscoderStatus],
    (selectedFiles, transcoderStatus) => {
        return !!selectedFiles.length && transcoderStatus === 'ready';
    }
);

const selectDownloadData = createSelector([selectSelectedFiles], (selectedFiles) => {
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

export {
    selectAllFiles,
    selectSelectedFiles,
    selectTranscoderStatus,
    selectDownloadData,
    selectIsAllFilesSelected,
    selectIsFilesEmpty,
    selectAllowTranscode,
    selectAllowDownload,
    selectAllowRemove,
};
