import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-book">Agregar Libro</Link>
        <Link to="/favorite-books">Mis Libros Favoritos</Link>
        <button onClick={onLogout}>Cerrar Sesión</button>
      </nav>
    </header>
  );
};

export default Header;
