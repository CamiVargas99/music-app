import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SongDetails = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    // Simula una solicitud a la API para obtener la canción
    fetch(`/api/songs/${id}`)
      .then((res) => res.json())
      .then((data) => setSong(data))
      .catch((err) => console.error('Error fetching song:', err));
  }, [id]);

  if (!song) return <div>Loading...</div>;

  return (
    <div>
      <h1>{song.title}</h1>
      <p><strong>Artist:</strong> {song.artist}</p>
      <p><strong>Genre:</strong> {song.genre}</p>
      <p><strong>Album:</strong> {song.album}</p>
      <div>
        <Link to={`/edit-song/${id}`}>
          <button>Edit Song</button>
        </Link>
        <button
          onClick={() => {
            // Lógica para eliminar la canción
            fetch(`/api/songs/${id}`, { method: 'DELETE' })
              .then(() => alert('Song deleted'))
              .catch((err) => console.error('Error deleting song:', err));
          }}
        >
          Delete Song
        </button>
      </div>
    </div>
  );
};

export default SongDetails;
