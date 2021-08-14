import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';
// cd
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initStore = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
};

let store = mockStore(initStore);
//jest.mock('../../../actions/ui', () => ({
//setError: jest.fn(),
//}));
//store.dispatch = jest.fn()
describe('Pruebas en RegisterScreen', () => {
    beforeEach(() => {
        //store = mockStore(initStore);
        store.clearActions();
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen />
            </MemoryRouter>
        </Provider>
    );

    test('debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe hacer el dispatch de la accion respectiva', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                name: 'email',
                value: '',
            },
        });
        wrapper.find('form').simulate('submit', {
            preventDefault() {},
        });
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.setError,
            payload: 'Name is required',
        });
    });

    test('debe mostrar el mensaje de error', () => {
        const initStore = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid',
            },
        };
        const store = mockStore(initStore);
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
            initStore.ui.msgError
        );
    });
});
