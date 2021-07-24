import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { LoadingScreen } from '../components/ui/LoadingScreen';
// cd
export const AppRouter = () => {
    const dispatch = useDispatch();
    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setCheking(false);
        });
    }, [dispatch, setCheking, setIsLoggedIn]);

    if (cheking) {
        return <LoadingScreen />;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isLoggedIn={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        isLoggedIn={isLoggedIn}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
};
