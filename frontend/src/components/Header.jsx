import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">Agregar Album</Link>
        <Link to="/">Mis Favoritos</Link>
        <button onClick={onLogout}>Cerrar Sesión</button>
      </nav>
    </header>
  );
};

export default Header;
