import { db } from '../firebase/firebase-config';
// cd
export const loadNotes = async (uid) => {
    const notesSnap = await db
        .collection(`${uid}/journal/notes`)
        .orderBy('date', 'desc')
        .get();
    const notes = [];
    notesSnap.forEach((note) => {
        notes.push({
            id: note.id,
            ...note.data(),
        });
    });
    return notes;
};
