// components/Favorites.jsx
import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Mis Libros Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes libros favoritos.</p>
      ) : (
        <ul>
          {favorites.map(bookId => (
            <li key={bookId}>{bookId}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
