import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLogin, startLogout } from '../../actions/auth';
import { types } from '../../types/types';
// cd
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initStore = {};
let store = mockStore(initStore);

describe('Pruebas en acciones de auth', () => {
    beforeEach(() => {
        store = mockStore(initStore);
    });

    test('login y logaout deben crear la accion respectiva', () => {
        const loginAcion = login('TESTING', 'Ron');
        const logoutAction = logout();
        expect(loginAcion).toEqual({
            type: types.login,
            payload: {
                uid: 'TESTING',
                displayName: 'Ron',
            },
        });
        expect(logoutAction).toEqual({
            type: types.logout,
        });
    });

    test('debe realizar el logout', async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: types.logout,
            },
            {
                type: types.logoutCleaning,
            },
        ]);
    });

    test('debe iniciar sesion', async () => {
        await store.dispatch(startLogin('test@testing.com', '123456'));
        const actions = store.getActions();
        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: '5nny2f4NiOYynSRSi8PLIKsmdb82',
                displayName: null,
            },
        });
    });
});
