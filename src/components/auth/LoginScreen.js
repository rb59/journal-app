import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
// cd
export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading, msgError } = useSelector(state => state.ui);
    const [formValues,handleInputChange] = useForm({
        email: 'ronaldblanco0509@gmail.com',
        password: '123456',
    });

    const {email,password} = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin(email,password) );
    }
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <div>
            <h3 className="auth__title mb-5">Login</h3>
            <form onSubmit={handleLogin}>
                {
                    msgError && ( 
                    <div className="auth__alert-error" >
                        {msgError}
                    </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input mb-1"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                    />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mb-1"
                    value={password}
                    onChange={handleInputChange}
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mb-1"
                    disabled={loading}
                    
                >
                    Login
                </button>
                <hr/>
                <div 
                    className="auth__social-networks"
                    onClick={handleGoogleLogin}
                >
                    <p>Login with Google</p>
                    <div 
                        className="google-btn"
                        >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="link" to="/auth/register">
                    Create new account
                </Link>
            </form>
        </div>
    );
};
