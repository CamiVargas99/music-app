// src/pages/TodosAlbums.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TodosAlbums.css'; // Opcional para estilos personalizados

const TodosAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cargar álbumes desde la API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/albums');
        if (!response.ok) throw new Error('Error al cargar los álbumes');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error al cargar los álbumes:', error);
        setError('No se pudieron cargar los álbumes. Inténtalo más tarde.');
      }
    };

    fetchAlbums();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navegar a la página de edición del álbum
  };

  return (
    <div className="todos-albums-container">
      <h2>Todos los Álbumes</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="albums-grid">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img src={album.coverImage} alt={album.title} className="album-imagen" />
            <h3>{album.title}</h3>
            <p>{album.artist}</p>
            <button onClick={() => handleEdit(album.id)} className="edit-button">
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosAlbums;
