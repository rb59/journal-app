import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
// cd
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initStore = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: null,
        notes: [],
    },
};

let store = mockStore(initStore);
store.dispatch = jest.fn();

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

describe('Pruebas en AppRouter', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    test('debe llamar el login si estoy autenticado', async () => {
        let user;
        await act(async () => {
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalledWith(
            '5nny2f4NiOYynSRSi8PLIKsmdb82',
            null
        );
    });
});
