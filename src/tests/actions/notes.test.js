jest.mock('../../helpers/fileUpload');
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startLoadingNotes,
    startNewNote,
    startSaveNote,
    startUploadPicture,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

// cd
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initStore = {
    auth: {
        uid: 'TESTING',
    },
    notes: {
        active: {
            id: 'Xk7kevxsQmskKOkmgs5o',
            title: 'Hola',
            body: 'Mundo',
        },
    },
};
let store = mockStore(initStore);


describe('Pruebas en notes actions', () => {
    beforeEach(() => {
        store = mockStore(initStore);
    });
    
    test('debe crear una nueva nota', async () => {
        await store.dispatch(startNewNote());
        const actions = store.getActions();
        const note = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
        };
        
        expect(actions).toEqual([
            {
                type: types.setActive,
                payload: note,
            },
            {
                type: types.addNew,
                payload: note,
            },
        ]);
        const doc = actions[0].payload.id;
        await db.doc(`TESTING/journal/notes/${doc}`).delete();
    });
    
    /* test('debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: types.loadNotes,
                payload: expect.any(Array),
            },
        ]);
        
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        };
        expect(actions[0].payload[0]).toMatchObject(expected);
    }); */
    
    test('debe actualizar la nota', async () => {
        const note = {
            id: 'Xk7kevxsQmskKOkmgs5o',
            title: 'titulo',
            body: 'body',
        };
        await store.dispatch(startSaveNote(note));
        const actions = store.getActions();
        expect(actions).toEqual([
            {
                type: types.updateNote,
                payload: {
                    id: note.id,
                    note: expect.any(Object),
                },
            },
        ]);

        // const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
        // expect(docRef.data().title).toBe(note.title);
    });
    
    test('debe actualizar la imagen', async () => {
        fileUpload.mockImplementation(() => 'http://holamundo.com/foto-prueba.jpg');
        const file = new File([], 'foto.jpg');
        await store.dispatch(startUploadPicture(file));
        // const doc = await 
        // return db.doc(`/TESTING/journal/notes/Xk7kevxsQmskKOkmgs5o`).get().then(doc => {
        //     expect(doc.data().url).toBe('http://holamundo.com/foto-prueba.jpg');
        // });
    });
});
