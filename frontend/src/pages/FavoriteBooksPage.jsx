import React, { useEffect, useState } from 'react';

const FavoriteBooksPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const response = await fetch('/api/favorite-books', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener libros favoritos');
        }

        const data = await response.json();
        setFavoriteBooks(data);
      } catch (error) {
        console.error('Error al obtener libros favoritos:', error);
        setError('Error al obtener tus libros favoritos. Inténtalo de nuevo más tarde.'); 
      }
    };

    fetchFavoriteBooks();
  }, []);

  return (
    <div>
      <h2>Mis Libros Favoritos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map((book) => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))
      ) : (
        <p>No tienes libros favoritos.</p>
      )}
    </div>
  );
};

export default FavoriteBooksPage;
