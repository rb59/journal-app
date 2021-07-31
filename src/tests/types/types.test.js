import { types } from '../../types/types';
// cd
describe('Pruebas en types.js', () => {
    const mockTypes = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
        setError: '[UI] Set Error',
        unsetError: '[UI] Unset Error',
        startLoading: '[UI] Start Loading',
        finishLoading: '[UI] Finish Loading',
        addNew: '[Notes] New Note',
        setActive: '[Notes] Set Active Note',
        loadNotes: '[Notes] Load Notes',
        updateNote: '[Notes] Update Note',
        deleteNote: '[Notes] Delete Note',
        logoutCleaning: '[Notes] Logout Cleaning',
    };
    test('debe ser igual al arreglo types', () => {
        expect(types).toEqual(mockTypes);
    });
});
