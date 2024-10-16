// src/pages/AddBookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones simples
    if (!title || !author) {
      setError('Todos los campos son requeridos.');
      return;
    }

    const newBook = { title, author };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        // Redirige a la página de inicio
        navigate('/');
      } else {
        setError('Error al crear el libro. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Autor:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Crear Libro</button>
      </form>
    </div>
  );
};

export default AddBookPage;
