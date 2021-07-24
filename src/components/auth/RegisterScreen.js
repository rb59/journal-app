import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { setError, unsetError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(({ ui }) => ui);
    const [formValues, handleInputChange] = useForm({
        name: 'Ronald',
        email: 'ronaldblanco0509@gmail.com',
        password: '123456',
        password2: '123456',
    });
    const { name, email, password, password2 } = formValues;

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(
                setError(
                    'Passwords should be at least 5 characters and match each other'
                )
            );
            return false;
        }
        dispatch(unsetError());
        return true;
    };
    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegister(name, email, password));
        }
    };
    return (
        <div>
            <h3 className="auth__title mb-5">Register</h3>
            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >
                {msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input mb-1"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input mb-1"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input mb-1"
                    onChange={handleInputChange}
                    value={password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input mb-1"
                    onChange={handleInputChange}
                    value={password2}
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-1"
                    disabled={loading}
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
