import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { FILE_LIMIT } from '@config';
import { TranscoderFile, TranscoderFileOutput } from '@types';

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

const selectFilesAmount = (state: RootState) => {
    return state.transcoder.files.length;
};

const selectSelectedFiles = createSelector([selectAllFiles], (files) =>
    files.filter((file) => file.isSelected)
);

const selectAllowAdd = createSelector(
    [selectFilesAmount, selectTranscoderStatus],
    (amount, transcoderStatus) => {
        return amount < FILE_LIMIT && transcoderStatus === 'ready';
    }
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

const selectDownloadableFiles = createSelector([selectSelectedFiles], (selectedFiles) => {
    return selectedFiles.filter(
        (
            file
        ): file is TranscoderFile & {
            output: { [K in keyof TranscoderFileOutput]: NonNullable<TranscoderFileOutput[K]> };
        } => {
            const { name, ext, url, size } = file.output;
            return !!(name && ext && url && size);
        }
    );
});

export {
    selectAllFiles,
    selectFilesAmount,
    selectSelectedFiles,
    selectTranscoderStatus,
    selectDownloadableFiles,
    selectIsAllFilesSelected,
    selectIsFilesEmpty,
    selectAllowTranscode,
    selectAllowDownload,
    selectAllowRemove,
    selectAllowAdd,
};
