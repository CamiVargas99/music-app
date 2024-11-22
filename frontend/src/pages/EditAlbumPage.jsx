// src/pages/EditAlbumPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditAlbumPage = () => {
  const { id } = useParams(); 
  const [album, setAlbum] = useState({ title: '', author: '', year: '', genre: '', imageUrl: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/albums/${id}`); 
        if (!response.ok) throw new Error('No se pudo obtener el álbum');
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error('Error al obtener el álbum:', error);
      }
    };

    fetchAlbum();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum({ ...album, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (
      album.title.trim() === '' || 
      album.author.trim() === '' || 
      album.year.trim() === '' || 
      album.genre.trim() === '' || 
      album.imageUrl.trim() === ''
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/albums/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(album),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el álbum');
      }

      navigate('/todos-albums'); // Redirigir a la lista de álbumes
    } catch (error) {
      console.error('Error al actualizar el álbum:', error);
      setError('Error al actualizar el álbum. Inténtalo de nuevo.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/albums/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al eliminar el álbum');
        }

        navigate('/todos-albums'); // Redirigir después de eliminar
      } catch (error) {
        console.error('Error al eliminar el álbum:', error);
      }
    }
  };

  return (
    <div className="edit-album-container">
      <h1>Editar Álbum</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="edit-album-form">
        <input
          type="text"
          name="title"
          value={album.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="author"
          value={album.author}
          onChange={handleChange}
          placeholder="Artista"
          required
        />
        <input
          type="text"
          name="year"
          value={album.year}
          onChange={handleChange}
          placeholder="Año"
          required
        />
        <input
          type="text"
          name="genre"
          value={album.genre}
          onChange={handleChange}
          placeholder="Género"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={album.imageUrl}
          onChange={handleChange}
          placeholder="URL de la Imagen"
          required
        />
        <button type="submit">Actualizar Álbum</button>
      </form>

      <button onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>
        Eliminar Álbum
      </button>
    </div>
  );
};

export default EditAlbumPage;

