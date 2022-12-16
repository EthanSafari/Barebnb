import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // setShowModal(false);

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };


  return (
    <div className="login-modal-form">
      <h1 style={{marginBottom: '5%'}}>Log In</h1>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li style={{ color: 'red' }} key={idx}>{error}</li>
        ))}
      </ul>
      <div>
      <label className="username-login">
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      </div>
      <div>
      <label className="password-login">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <button onClick={() => {
        setPassword('password');
        setCredential('demo@user.io');
      }} style={{
        padding: '.3em',
        borderRadius: '4px',
        margin: '5px',
        border: '1px solid grey',
      }}>
        Demo User
      </button>
      <button type="submit" className="login-button-on-modal">Log In</button>
    </form>
    </div>
  );
}

export default LoginForm;
