import { db } from '../firebase/firebase-config';
// cd
export const loadNotes = async (uid) => {
    const notes = [];
    try {
        const notesSnap = await db
            .collection(`${uid}/journal/notes`)
            .orderBy('date', 'desc')
            .get();

        notesSnap.forEach((note) => {
            notes.push({
                id: note.id,
                ...note.data(),
            });
        });
    } catch (e) {
        console.log(e);
    }
    return notes;
};
