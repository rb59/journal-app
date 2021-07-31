import { mount } from 'enzyme';
import { DateTime, Settings } from 'luxon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';
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
        active: {
            id: '123aer',
            title: 'titulo',
            body: 'cuerpo',
            date: 122,
        },
        notes: [],
    },
};

let store = mockStore(initStore);
store.dispatch = jest.fn();

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
}));

describe('Pruebas en NoteScreen', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    const expectedNow = DateTime.local(2021, 10, 17, 22, 0, 0);
    Settings.now = () => expectedNow.toMillis();
    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen />
        </Provider>
    );

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe disparar el activeNote', () => {
        wrapper.find('textarea').simulate('change', {
            target: {
                name: 'body',
                value: 'Nuevo mundo',
            },
        });

        expect(activeNote).toHaveBeenLastCalledWith('123aer', {
            id: '123aer',
            title: 'titulo',
            body: 'Nuevo mundo',
            date: 122,
        });
    });
});
