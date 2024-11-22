import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAlbumPage.css';

const CreateAlbumPage = () => {
  const [album, setAlbum] = useState({
    title: '',
    author: '',
    year: '',
    genre: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const validateFields = () => {
    if (album.title.trim().length < 5) return 'El título debe tener al menos 5 caracteres.';
    if (album.author.trim().length < 5) return 'El autor debe tener al menos 5 caracteres.';
    if (!/^\d+$/.test(album.year) || Number(album.year) <= 0) return 'El año debe ser un número positivo.';
    if (album.genre.trim().length < 3) return 'El género debe tener al menos 3 caracteres.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem('token'); 

    try {
      const response = await fetch('http://localhost:3001/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(album),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el álbum');
      }

      navigate('/'); // Redirigir al inicio o lista de album
    } catch (error) {
      console.error('Error al crear el album:', error);
      setError('Error al crear el álbum. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="create-album-container">
      <div className="create-album-box">
        <h1 className="create-album-title">Agregar Álbum</h1>
        {error && <p className="create-album-error">{error}</p>}

        <form className="create-album-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="create-album-input"
            value={album.title}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <input
            type="text"
            name="author"
            className="create-album-input"
            value={album.author}
            onChange={handleChange}
            placeholder="Artista"
            required
          />
          <input
            type="text"
            name="year"
            className="create-album-input"
            value={album.year}
            onChange={handleChange}
            placeholder="Año"
            required
          />
          <input
            type="text"
            name="genre"
            className="create-album-input"
            value={album.genre}
            onChange={handleChange}
            placeholder="Género"
            required
          />
          <button type="submit" className="create-album-button">Agregar Álbum</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbumPage;



