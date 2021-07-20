import React, { useEffect, useState } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import {firebase} from '../firebase/firebase-config';
import {AuthRouter} from './AuthRouter';
import {JournalScreen} from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// cd
export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid){
                dispatch( login(user.uid,user.displayName) );
                setIsLoggedIn(true);
            } else{
                setIsLoggedIn(false);
            }
            setCheking(false);
        });
        
    }, [dispatch,setCheking,setIsLoggedIn]);

    if (cheking) {
        return (
            <h1>Waiting</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isLoggedIn={isLoggedIn} path="/auth" component={AuthRouter} />
                    <PrivateRoute isLoggedIn={isLoggedIn} exact path="/" component={JournalScreen} />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
