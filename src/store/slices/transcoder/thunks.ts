import { createAsyncThunk } from '@reduxjs/toolkit';

import { load } from '@/ffmpeg';

export const loadTranscoder = createAsyncThunk('transcoder/loadTranscoder', load);
