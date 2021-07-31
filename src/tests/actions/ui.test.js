import {
    finishLoading,
    setError,
    startLoading,
    unsetError,
} from '../../actions/ui';
import { types } from '../../types/types';

// cd
describe('Pruebas en ui actions', () => {
    test('todas las acciones deben funcionar', () => {
        const setErrorAction = setError('Help!');
        expect(setErrorAction).toEqual({
            type: types.setError,
            payload: 'Help!',
        });
        const unsetErrorAction = unsetError();
        expect(unsetErrorAction).toEqual({
            type: types.unsetError,
        });
        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.startLoading,
        });
        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.finishLoading,
        });
    });
});
