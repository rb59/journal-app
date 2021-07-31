import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
// cd

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };
        try {
            const doc = await db
                .collection(`${uid}/journal/notes`)
                .add(newNote);
            dispatch(activeNote(doc.id, newNote));
            dispatch(addNote(doc.id, newNote));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addNote = (id, note) => ({
    type: types.addNew,
    payload: {
        id,
        ...note,
    },
});

export const activeNote = (id, note) => ({
    type: types.setActive,
    payload: {
        id,
        ...note,
    },
});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        try {
            const notes = await loadNotes(uid);
            dispatch(setNotes(notes));
        } catch (error) {
            console.log(error);
        }
    };
};

export const setNotes = (notes) => ({
    type: types.loadNotes,
    payload: notes,
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!note.url) {
            delete note.url;
        }
        note.date = new Date().getTime();
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        try {
            await db
                .collection(`${uid}/journal/notes`)
                .doc(note.id)
                .update(noteToFirestore);
            dispatch(refreshNote(note.id, note));
            Swal.fire(
                'Saved',
                `<b><i>"${note.title}"</i></b> has been saved`,
                'success'
            );
        } catch (error) {
            console.log(error);
        }
    };
};

export const refreshNote = (id, note) => ({
    type: types.updateNote,
    payload: { id, note },
});

export const startUploadPicture = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;
        Swal.fire({
            title: 'Uploading picture...',
            text: 'Please wait...',
            allowOutsideClick: false,
        });
        Swal.showLoading();
        try {
            const fileUrl = await fileUpload(file);
            active.url = fileUrl;
            dispatch(startSaveNote(active));
        } catch (error) {
            console.log(error);
        }
        Swal.close();
    };
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete();
            dispatch(deleteNote(id));
            Swal.fire('Deleted', 'Your note has been deleted', 'error');
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteNote = (id) => ({
    type: types.deleteNote,
    payload: id,
});

export const cleanNotes = () => ({
    type: types.logoutCleaning,
});
