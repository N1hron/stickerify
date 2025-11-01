import { useDispatch, useSelector } from 'react-redux';

import type { AppState, AppDispatch } from '.';

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
