import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

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
        <ul className="profile-dropdown">
          <div>
            <div>
              <li>{user.username}</li>
            </div>
            <li>{user.email}</li>
          </div>
          <div>
            <li>
              <NavLink to={`/user/bookings`}>
                Bookings
              </NavLink>
            </li>
          </div>
          <div className="login-button">
            <li>
              <button onClick={logout} style={{
                padding: '.3em',
                borderRadius: '4px',
                margin: '3px',
                border: '1px solid grey',
              }}>Log Out</button>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
