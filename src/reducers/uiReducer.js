import { types } from "../types/types";

const initialState = {
    loading: false,
    msgError: null,
};

export const uiReducer = (state = initialState,action) => {
    switch (action.type) {
        case types.setError:
            return {...state, msgError: action.payload};
        case types.unsetError:
            return {...state, msgError: null};
        case types.startLoading:
            return {...state,loading: true}
        case types.finishLoading:
            return {...state,loading: false}
        default:
            return state;
    }
};