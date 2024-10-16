import React, { useEffect, useState } from 'react';

const HomePage = ({ loggedInUser }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState(new Set()); 

  useEffect(() => {
    // Llamada al backend para obtener todos los libros
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books'); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); 
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };
    fetchBooks();
  }, []);


  const handleFilter = () => {
    if (searchText.trim() === '') {
      // Si no hay texto de búsqueda, mostrar todos los libros
      setFilteredBooks(books);
    } else {
      // Filtrar los libros por título, ignorando mayúsculas y minúsculas
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  // Función para manejar favoritos
  const toggleFavorite = (bookId) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(bookId)) {
      updatedFavorites.delete(bookId); 
    } else {
      updatedFavorites.add(bookId); 
    }
    setFavorites(updatedFavorites);
  };

  // Barra de búsqueda y listado de libros
  return (
    <div>
      <h2>Listado de libros</h2>

      <div>
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      <div>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} style={{ marginBottom: '20px' }}>
              <h3>{book.title}</h3>
              <p>Autor: {book.author}</p>

           
              {book.createdBy === loggedInUser && (
                <button style={{ marginRight: '10px' }}>Editar</button>
              )}

              
              <button onClick={() => toggleFavorite(book._id)} style={{ marginLeft: '10px' }}>
                {favorites.has(book._id) ? '❤️' : '🤍'} 
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
