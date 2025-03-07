import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '.';

const useAppSelector = useSelector.withTypes<RootState>();
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export { useAppSelector, useAppDispatch };
