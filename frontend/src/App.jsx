import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EditSong from './components/EditSong';

import EditPlaylist from './components/EditPlaylist';

import TodosAlbums from './pages/TodosAlbums';
import FavoriteAlbumsPage from './pages/FavoriteAlbumsPage';
import CreateAlbumPage from './pages/CreateAlbumPage';
import EditAlbumPage from './pages/EditAlbumPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import SongDetails from './components/SongDetails';
import './app.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Mantener autenticación si el token existe
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="container">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/HomePage" element={<PrivateRoute element={HomePage} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
     
          <Route path="/edit-playlist/:id" element={<EditPlaylist />} />
          <Route path="/CreateAlbumPage" element={<PrivateRoute element={CreateAlbumPage} />} />
          <Route path="/edit-song/:id" element={<EditSong />} />
          <Route path="/edit/:id" element={<PrivateRoute element={EditAlbumPage} />} />
          <Route path="/todos-albums" element={<TodosAlbums />} />
          <Route path="/favorites" element={<PrivateRoute element={FavoriteAlbumsPage} />} />


          <Route path="/song/:id" element={<SongDetails />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
