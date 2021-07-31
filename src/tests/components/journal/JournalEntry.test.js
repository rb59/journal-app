import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from '../../../actions/notes';
import { JournalEntry } from '../../../components/journal/JournalEntry';
// cd
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initStore = {
    notes: {
        active: {
            id: '123aer',
            title: 'titulo',
            body: 'cuerpo',
            date: 1627335006001,
        },
    },
};

let store = mockStore(initStore);
store.dispatch = jest.fn();

describe('Pruebas en JournalEntry', () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });
    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...initStore.notes.active} />
        </Provider>
    );

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe disparar el activeNote', () => {
        wrapper.find('.journal__entry').simulate('click');

        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(initStore.notes.active.id, { ...initStore.notes.active })
        );
    });
});
