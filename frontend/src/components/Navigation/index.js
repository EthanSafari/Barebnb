import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import SpotInputModal from '../SpotInput';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage/SignupForm';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(true);

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
            <div>
                <ul className='navbar-links'>
                    {isLoaded && (
                       <ProfileButton
                       user={sessionUser}
                       setLogin={setLogin}
                       setShowModal={setShowModal}
                       />
                    )}
                </ul>
                {showModal && <Modal onClose={() => setShowModal(false)}>
                        {login ? <LoginForm /> : <SignupFormPage />}
                </Modal>}
            </div>
        </nav>
    );
}

export default Navigation;
