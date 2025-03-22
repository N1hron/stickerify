import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FileData, TranscoderStatus } from '../../../types';
import { config } from '../../../config';
import { prepareFileData, revokeFileURLs } from './utils';
import { loadTranscoder } from './thunks';

type TranscoderSliceState = {
    files: FileData[];
    status: TranscoderStatus;
};

const initialState: TranscoderSliceState = {
    files: [],
    status: 'idle',
};

const transcoderSlice = createSlice({
    name: 'transcoder',
    initialState,
    reducers: {
        addFiles: {
            reducer: (state, action: PayloadAction<FileData[]>) => {
                state.files = [...state.files, ...action.payload].slice(0, config.fileLimit);
            },
            prepare: prepareFileData,
        },
        setFileSelection: (
            state,
            action: PayloadAction<[FileData['id'], FileData['isSelected']]>
        ) => {
            const [id, isSelected] = action.payload;
            const file = state.files.find((file) => file.id === id);

            if (file) {
                file.isSelected = isSelected;
            }
        },
        setAllFilesSelection: (state, action: PayloadAction<FileData['isSelected']>) => {
            state.files.forEach((file) => (file.isSelected = action.payload));
        },
        removeSelectedFiles: (state) => {
            state.files = state.files.filter((file) => {
                if (file.isSelected) {
                    return revokeFileURLs(file);
                }
                return true;
            });
        },
        removeAllFiles: (state) => {
            state.files.forEach(revokeFileURLs);
            state.files = [];
        },
        renameFile: (state, action: PayloadAction<[FileData['id'], string]>) => {
            const [id, newName] = action.payload;
            const file = state.files.find((file) => file.id === id);

            if (file) {
                file.output.name = newName;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(loadTranscoder.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loadTranscoder.rejected, (state) => {
            state.status = 'error';
        });
        builder.addCase(loadTranscoder.fulfilled, (state) => {
            state.status = 'ready';
        });
    },
});

export const reducer = transcoderSlice.reducer;

export * from './selectors';
export { loadTranscoder };
export const {
    addFiles,
    setFileSelection,
    setAllFilesSelection,
    removeSelectedFiles,
    removeAllFiles,
    renameFile,
} = transcoderSlice.actions;
