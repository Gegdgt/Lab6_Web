import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const user_id = Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) + 10000000000000;
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('https://hdt-6-backend.vercel.app/signin', { user_id, name, username, password, is_creator: false})
      .then(result => console.log(result))
      .catch(error => console.error(error))
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h3 style={{ textAlign: 'center', color: 'white' }}>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group password-toggle">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Sign In"
              className="btn btn-primary"
            />
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;