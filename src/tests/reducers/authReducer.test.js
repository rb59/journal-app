import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';
// cd
describe('Pruebas en authReducer', () => {
    const initialState = {
        uid: 'A12345',
        name: 'Ronald',
    };

    test('debe hacer login', () => {
        const state = authReducer(
            {},
            {
                type: types.login,
                payload: {
                    uid: initialState.uid,
                    displayName: initialState.name,
                },
            }
        );
        expect(state).toEqual(initialState);
    });

    test('debe hacer logout', () => {
        const state = authReducer(initialState, {
            type: types.logout,
        });
        expect(state).toEqual({});
    });

    test('debe retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });
});
