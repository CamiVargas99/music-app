import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa el archivo CSS del Navbar

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav className="navbar">
      <h1>Albums</h1>
      <ul>
        {isAuthenticated && <li><Link to="/">Inicio</Link></li>}
        {isAuthenticated && <li><Link to="/CreateAlbumPage">Agregar Album</Link></li>}
        {isAuthenticated && <li><Link to="/favorites">Mis Favoritos</Link></li>}
        
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
