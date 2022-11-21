import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import SpotInputModal from '../SpotInput';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
            <SpotInputModal user={sessionUser} />
            <ProfileButton user={sessionUser} />
            </>
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
                <img src='https://th.bing.com/th/id/R.cca1586ebd83228b4af102ea388e643d?rik=cdloAteS2qnK4w&riu=http%3a%2f%2fpngimg.com%2fuploads%2fletter_b%2fletter_b_PNG36.png&ehk=6gsJj8pMKxbBwU5Wns%2f%2fe%2bT5cpPFdZEOwaAeLTKD3EI%3d&risl=&pid=ImgRaw&r=0' alt='barebnb' style={{
                    width: '2rem',
                    margin: '0 5px -4% 0'
                }} />
                    barebnb
                </NavLink>
            </div>
            <div className='navbar-links'>
                <ul>
                    {isLoaded && sessionLinks}

                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
