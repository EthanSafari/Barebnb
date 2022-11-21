import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <button className="profile-buttons-right" onClick={openMenu}>
        <div>
          <i class="fa-solid fa-bars" style={{
            cursor: 'pointer',
            margin: '2px',
          }}></i>
        </div>
        <div>
          <i class="fa-regular fa-user" style={{
            cursor: 'pointer',
            margin: '2px',
          }}></i>
        </div>
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <ul className="dropdown-menu">
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
