// components/BookList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Obtener libros de la API
    const fetchBooks = async () => {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    };

    fetchBooks();
    // Obtener libros favoritos del localStorage o de la API
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (bookId) => {
    const updatedFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Lista de Libros</h1>
      <Link to="/favorites">Mis libros favoritos</Link>
      <div className="book-list">
        {books.map(book => (
          <div key={book._id} className="book-item">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => toggleFavorite(book._id)}>
              {favorites.includes(book._id) ? (
                <span>❤️</span> // Corazón relleno
              ) : (
                <span>🤍</span> // Corazón vacío
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
