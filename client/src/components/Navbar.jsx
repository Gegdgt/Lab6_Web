import React, { useState } from 'react';
import './Navbar.css'; // Importa el archivo CSS para estilos

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="navbar">
      <div className="navbar-brand"><a href="/">MyTube</a></div>
      <div className="navbar-links">
        <a href="/user">Usuarios</a>
        <a href="Create">Crear</a>
        <a href="/search">Buscador</a>
      </div>
    </div>
  );
}

export default Navbar;
