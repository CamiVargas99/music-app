import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav>
      <h1>Libros</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/add-book">Agregar Libro</Link></li>
        <li><Link to="/favorites">Mis libros favoritos</Link></li>
    
        {!isAuthenticated && (
          <>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
       
        {isAuthenticated && (
          <li>
            <Link to="/login" onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
