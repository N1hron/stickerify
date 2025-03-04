import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { reducer as settingsReducer } from './slices/settings';

const store = configureStore({
    reducer: { settings: settingsReducer },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { store };
export { useAppSelector, useAppDispatch };

export * from './slices/settings';
