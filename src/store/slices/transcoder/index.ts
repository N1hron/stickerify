import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FileData, FileStatus, TranscoderStatus } from '@types';
import { config } from '@data';

import { prepareFileData, revokeFileURLs } from './utils';
import { loadTranscoder, transcodeSelectedFiles } from './thunks';

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
        setFileSelection: (state, action: PayloadAction<[string, FileData['isSelected']]>) => {
            const [id, isSelected] = action.payload;
            const file = state.files.find((file) => file.id === id);

            if (file) {
                file.isSelected = isSelected;
            }
        },
        setAllFilesSelection: (state, action: PayloadAction<FileData['isSelected']>) => {
            state.files.forEach((file) => (file.isSelected = action.payload));
        },
        setFileOutput: (state, action: PayloadAction<[string, FileData['output']]>) => {
            const [id, outputFile] = action.payload;
            const file = state.files.find((file) => file.id === id);
            if (file) file.output = outputFile;
        },
        setFileStatus: (state, action: PayloadAction<[string, FileStatus]>) => {
            const [id, status] = action.payload;
            const file = state.files.find((file) => file.id === id);
            if (file) file.status = status;
        },
        setTranscoderStatus: (state, action: PayloadAction<TranscoderStatus>) => {
            state.status = action.payload;
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
        renameFile: (state, action: PayloadAction<[string, string]>) => {
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
export { loadTranscoder, transcodeSelectedFiles };
export const {
    addFiles,
    setFileSelection,
    setAllFilesSelection,
    removeSelectedFiles,
    removeAllFiles,
    renameFile,
    setFileOutput,
    setFileStatus,
    setTranscoderStatus,
} = transcoderSlice.actions;
