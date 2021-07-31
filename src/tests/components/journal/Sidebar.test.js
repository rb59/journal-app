import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';
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

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

describe('Pruebas en Sidebar', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <Sidebar />
            </MemoryRouter>
        </Provider>
    );

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe llamar el startLogout', () => {
        wrapper.find('button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
    });

    test('debe llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    });
});
