import { types } from '../types/types';

export const setError = (err) => ({
    type: types.setError,
    payload: err,
});
export const unsetError = (err) => ({
    type: types.unsetError,
});
export const startLoading = () => ({
    type: types.startLoading,
});
export const finishLoading = () => ({
    type: types.finishLoading,
});
