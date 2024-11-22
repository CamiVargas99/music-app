import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlaylist = () => {
  const { id } = useParams(); // Obtener el ID de la playlist desde la URL
  const navigate = useNavigate();

  const [playlistData, setPlaylistData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData({ ...playlistData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlistData),
      });

      if (response.ok) {
        alert('Playlist actualizada exitosamente.');
        navigate('/playlists'); // Redirigir al listado de playlists
      } else {
        alert('Error al actualizar la playlist.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Editar Playlist</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={playlistData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={playlistData.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EditPlaylist;
