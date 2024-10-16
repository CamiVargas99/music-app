import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBookPage = () => {
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

   // Validaciones
if (book.title.trim() === '' || book.author.trim() === '' || book.description.trim() === '') {
    setError('Todos los campos son obligatorios.');
    return;
  }
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el libro');
      }

      navigate('/'); // Redirigir a la página principal después de crear el libro
    } catch (error) {
      console.error('Error al crear el libro:', error);
      setError('Error al crear el libro. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Crear Libro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Autor"
          required
        />
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Descripción"
          required
        />
        <button type="submit">Crear Libro</button>
      </form>
    </div>
  );
};

export default CreateBookPage;
