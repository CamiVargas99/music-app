import React, { useEffect, useState } from 'react';

const FavoriteAlbumsPage = () => {
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavoriteAlbums = async () => {
      try {
        const response = await fetch('/api/favorite-albums', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener álbumes favoritos');
        }

        const data = await response.json();
        setFavoriteAlbums(data);
      } catch (error) {
        console.error('Error al obtener álbumes favoritos:', error);
        setError('Error al obtener tus álbumes favoritos. Inténtalo de nuevo más tarde.');
      }
    }

    fetchFavoriteAlbums();
  }, []);

  const handleRemoveFavorite = async (albumId) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este álbum de favoritos?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/favorite-albums/${albumId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar álbum de favoritos');
        }

        setFavoriteAlbums((prevAlbums) => prevAlbums.filter((album) => album._id !== albumId));
      } catch (error) {
        console.error('Error al eliminar álbum de favoritos:', error);
      }
    }
  };

  return (
    <div>
      <h2>Mis Álbumes Favoritos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {favoriteAlbums.length > 0 ? (
        favoriteAlbums.map((album) => (
          <div key={album._id}>
            <h3>{album.title}</h3>
            <p>Artista: {album.artist}</p>
            <p>Número de canciones: {album.songs.length}</p>
            <button onClick={() => handleRemoveFavorite(album._id)}>Eliminar de Favoritos</button>
          </div>
        ))
      ) : (
        <p>No tienes álbumes favoritos.</p>
      )}
    </div>
  );
};

export default FavoriteAlbumsPage;
