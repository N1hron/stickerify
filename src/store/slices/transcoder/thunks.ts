import { createAsyncThunk } from '@reduxjs/toolkit';

import { load, transcode } from '@/ffmpeg';
import { AppDispatch, RootState } from '@/store';
import { selectSelectedFiles, setFileOutput, setFileStatus, setStatus } from '@slices/transcoder';

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

        dispatch(setFileStatus([id, 'transcoding']));

        await transcode(file, settings)
            .then((res) => {
                dispatch(setFileOutput([id, { ...file.output, ...res }]));
                dispatch(setFileStatus([id, 'success']));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setFileStatus([id, 'error']));
            });
    }

    dispatch(setStatus('ready'));
});

export { loadTranscoder, transcodeSelectedFiles };
