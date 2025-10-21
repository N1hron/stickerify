import { createAsyncThunk } from '@reduxjs/toolkit';

import { load, reload, transcode } from '@/ffmpeg';
import { AppDispatch, RootState } from '@store';
import { selectSelectedFiles, setFileOutput, setFileStatus, setStatus } from '@slices/transcoder';
import { devLog } from '@/utils/devLog';

const loadTranscoder = createAsyncThunk('transcoder/loadTranscoder', load);

const transcodeSelectedFiles = createAsyncThunk<
    void,
    undefined,
    { dispatch: AppDispatch; state: RootState }
>('transcoder/transcodeSelectedFiles', async (_, { getState, dispatch }) => {
    const selectedFiles = selectSelectedFiles(getState());
    const settings = getState().settings.items;

    dispatch(setStatus('transcoding'));

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const id = file.id;

        dispatch(setFileStatus({ id, status: 'transcoding' }));

        await transcode(file, settings)
            .catch(async (error) => {
                if (error === 'RuntimeError: index out of bounds') {
                    devLog('Index out of bounds, reloading FFmpeg');

                    await reload();
                    return transcode(file, settings);
                } else {
                    throw error;
                }
            })
            .then((result) => {
                dispatch(setFileOutput([id, { ...file.output, ...result }]));
                dispatch(setFileStatus({ id, status: 'success' }));
            })
            .catch((error) => {
                devLog(error);
                dispatch(setFileStatus({ id, status: 'error', message: 'Unsupported' }));
            });
    }

    dispatch(setStatus('ready'));
});

export { loadTranscoder, transcodeSelectedFiles };
