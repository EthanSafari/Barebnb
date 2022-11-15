import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }

    return (
        <nav className='navbar'>
            <div className='brand-name'>
                <NavLink exact to="/">
                <i className="fa-brands fa-airbnb" style={{
                    backgroundColor: 'transparent',
                    margin: '0 .5rem',
                    fontSize: '2rem'
                }}></i>
                airbnb
                </NavLink>
            </div>
            <div className='navbar-links'>
                <ul>
                    {/* <NavLink exact to="/">Home</NavLink> */}
                    {isLoaded && sessionLinks}

                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
