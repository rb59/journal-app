import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startLogin = (email,password) => {
    return async(dispatch) => {
        dispatch( startLoading() );
        try {
            const {user:{uid,displayName}} = await firebase.auth().signInWithEmailAndPassword(email,password);  
            dispatch( login(uid,displayName) ); 
            dispatch( finishLoading() );
        } catch (e) {
            Swal.fire('Error',e.message,'error');
            dispatch( finishLoading() );
        }
    };
};

export const startRegister = (name,email,password) => {
    return async(dispatch) => {
        dispatch( startLoading() );
        try {
            const {user} = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await user.updateProfile({displayName: name});
            const {uid,displayName} = user;
            dispatch( login(uid,displayName) );
            dispatch( finishLoading() );  
        } catch (e) {
            Swal.fire('Error',e.message,'error');
            dispatch( finishLoading() );  
        }
    };
};

export const startGoogleLogin = () => {
    return async(dispatch) => {
        try {
            const {user:{uid,displayName}} = await firebase.auth().signInWithPopup(googleAuthProvider);
            dispatch( login(uid,displayName) );
        } catch (e) {
            console.log(e);
        }
    };
};

export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    },
});

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    };
}; 

export const logout = () => ({
    type: types.logout,
});