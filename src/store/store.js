import {createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
// cd
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__/*({trace:true})*/) || compose;
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});
export const store = createStore(
    reducers,
    composeEnhancers( applyMiddleware(thunk))
);