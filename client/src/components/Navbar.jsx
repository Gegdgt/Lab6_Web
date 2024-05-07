import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import './Navbar.css';
import { useUser } from '../context/UserContext';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { username, is_creator, logout } = useUser();
  const navigate = useNavigate(); // Define el useNavigate

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('is_creator'); // Borra el is_creator
    logout(); 
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-brand"><a href="/">MyTube</a></div>
      <div className="navbar-links">
        {username && is_creator ? (
          <>
            <a href="/user">{username}</a>
            <a href="/create">Crear</a>
            <a href="/search">Buscador</a>
            <a href="/login" onClick={handleLogout}>Cerrar Sesión</a>
          </>
        ) : username ? (
          <>
            <a href="/user">{username}</a>
            <a href="/terms">Términos</a>
            <a href="/search">Buscador</a>
            <a href="/login" onClick={handleLogout}>Cerrar Sesión</a>
          </>
        ) : (
          <>
            <a href="/login">Iniciar Sesión</a>
            <a href="/signin">Registrarse</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;