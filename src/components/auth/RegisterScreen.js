import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <div>
            <h3 className="auth__title mb-5">Register</h3>
            <form>
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input mb-1"
                    autoComplete="off"
                />
                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input mb-1"
                    autoComplete="off"
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mb-1"
                />
                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input mb-1"
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mb-1"
                >
                    Register
                </button>
                <hr className="mb-5" />
                
                <Link className="link" to="/auth/login">
                    Already registered?
                </Link>
            </form>
        </div>
    );
};
