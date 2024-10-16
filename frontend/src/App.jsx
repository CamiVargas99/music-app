import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; 

import BookList from './components/BookList';
import Favorites from './components/Favorites';

import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import FavoriteBooksPage from './pages/FavoriteBooksPage';
import PrivateRoute from './components/PrivateRoute';



import libro1 from './img/libro1.jpg';
import tapa2 from './img/tapa2.jpg';
import libro3 from './img/libro3.jpg';

import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';

import './app.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si el token existe en el almacenamiento local
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de sesión
    setIsAuthenticated(false); // Actualiza el estado
  };

  return (
    <Router>
      <div className="container">
        <h1>Libros</h1>
        
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/add-book">Agregar libro</Link></li>
            <li><Link to="/favorites">Mis libros favoritos</Link></li>
            <li><Link to="/all-books">Todos los libros</Link></li>
            {isAuthenticated && <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>}
          </ul>
        </nav>


        <div className="book-images">
          <img src={libro1} alt="Libro 1" />
          <img src={tapa2} alt="Libro 2" />
          <img src={libro3} alt="Libro 3" />
        </div>





        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/create" element={<CreateBookPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/favorites" element={isAuthenticated ? <FavoriteBooksPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
