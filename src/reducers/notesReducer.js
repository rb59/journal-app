import { types } from '../types/types';
const initialState = {
    notes: [],
    active: null,
};
export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes],
            };

        case types.setActive:
            return {
                ...state,
                active: {
                    ...action.payload,
                },
            };

        case types.loadNotes:
            return {
                ...state,
                notes: [...action.payload],
            };

        case types.updateNote:
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload.note : note
                ),
            };

        case types.deleteNote:
            return {
                ...state,
                active: null,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };

        case types.logoutCleaning:
            return initialState;

        default:
            return state;
    }
};
