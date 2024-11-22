// components/AlbumList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener álbumes de la API
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/albums'); 
        setAlbums(response.data);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
        setError('Hubo un problema al cargar los álbumes. Intenta de nuevo más tarde.');
      }
    };

    fetchAlbums();

    // Obtener álbumes favoritos del localStorage o de la API
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (albumId) => {
    const updatedFavorites = favorites.includes(albumId)
      ? favorites.filter(id => id !== albumId)
      : [...favorites, albumId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Lista de Álbumes</h1>
      <Link to="/favorites">Mis álbumes favoritos</Link>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="album-list">
          {albums.map(album => (
            <div key={album._id} className="album-item">
              <img src={album.imageUrl} alt={`${album.title} cover`} width="100" />
              <h3>{album.title}</h3>
              <p>{album.author}</p>
              <p>Año: {album.year}</p>
              <p>Género: {album.genre}</p>
              <button onClick={() => toggleFavorite(album._id)}>
                {favorites.includes(album._id) ? (
                  <span>❤️</span> // Corazón relleno
                ) : (
                  <span>🤍</span> // Corazón vacío
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumList;
