import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startGoogleLogin, startLogin } from '../../../actions/auth';
import { LoginScreen } from '../../../components/auth/LoginScreen';
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
        notes: [],
        active: null,
    },
};

let store = mockStore(initStore);
store.dispatch = jest.fn();
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLogin: jest.fn(),
}));

describe('Pruebas en LoginScreen', () => {
    beforeEach(() => {
        store = mockStore(initStore);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    );

    test('debe hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe disparar el GoogleLogin', () => {
        wrapper.find('.google-btn').simulate('click');
        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test('debe disparar el Login con argumentos', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault() {},
        });
        expect(startLogin).toHaveBeenCalledWith(
            'ronaldblanco0509@gmail.com',
            '123456'
        );
    });
});
