import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5050/login', { username, password })
      .then(result => {
        console.log(result);
        if (result.data.message === "Completado") {
          localStorage.setItem('username', username);
          localStorage.setItem('user_id', result.data.user_id);
          console.log(username);
          navigate('/');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h3 style={{ textAlign: 'center', color: 'white' }}>Log In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Log In"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <a href="/signin">Create one</a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
