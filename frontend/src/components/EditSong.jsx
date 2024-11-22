import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditSong = () => {
  const { id } = useParams(); // Obtener el ID de la canción desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: '',
    album: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Canción actualizada exitosamente.');
        navigate('/'); // Redirigir al Home
      } else {
        alert('Error al actualizar la canción.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Editar Canción</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Artista:
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Género:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Álbum:
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditSong;
