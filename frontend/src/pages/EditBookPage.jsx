import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams(); // Obtener el ID del libro desde la URL
  const [book, setBook] = useState({ title: '', author: '', description: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error al obtener el libro:', error);
      }
    };

    fetchBook();
  }, [id]);

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
      const token = localStorage.getItem('token'); // Obtener el token de autenticación
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token al encabezado
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el libro');
      }

      navigate('/'); // Redirigir a la página principal después de actualizar el libro
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      setError('Error al actualizar el libro. Inténtalo de nuevo.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
        const response = await fetch(`/api/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}` // Agregar el token al encabezado
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al eliminar el libro');
        }

        navigate('/'); // Redirigir a la página principal después de eliminar el libro
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    }
  };

  return (
    <div>
      <h1>Editar Libro</h1>
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
        <button type="submit">Actualizar Libro</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>
        Eliminar Libro
      </button>
    </div>
  );
};

export default EditBookPage;
