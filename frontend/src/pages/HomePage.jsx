import React, { useEffect, useState } from 'react';

const HomePage = ({ loggedInUser }) => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/albums');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAlbums(data);
        setFilteredAlbums(data);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };
    fetchAlbums();
  }, []);

  const handleFilter = () => {
    if (searchText.trim() === '') {
      setFilteredAlbums(albums);
    } else {
      const filtered = albums.filter((album) =>
        album.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredAlbums(filtered);
    }
  };

  const toggleFavorite = (albumId) => {
    const updatedFavorites = new Set(favorites);
    if (updatedFavorites.has(albumId)) {
      updatedFavorites.delete(albumId);
    } else {
      updatedFavorites.add(albumId);
    }
    setFavorites(updatedFavorites);
  };

  const handleDeleteAlbum = async (albumId) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este álbum?');
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3001/api/albums/${albumId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el álbum');
        }

       
        setAlbums((prevAlbums) => prevAlbums.filter((album) => album._id !== albumId));
        setFilteredAlbums((prevFiltered) => prevFiltered.filter((album) => album._id !== albumId));
      } catch (error) {
        console.error('Error al eliminar el álbum:', error);
      }
    }
  };

  return (
    <div>
      <h2>Listado de Álbumes</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
      <div>
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <div key={album._id} style={{ marginBottom: '20px' }}>
              <h3>{album.title}</h3>
              <p>Artista: {album.artist}</p>
              <p>Número de canciones: {album.songs.length}</p>
              {album.createdBy === loggedInUser && (
                <>
                  <button style={{ marginRight: '10px' }} onClick={() => {  }}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteAlbum(album._id)} style={{ marginLeft: '10px' }}>
                    Eliminar Álbum
                  </button>
                </>
              )}
              <button onClick={() => toggleFavorite(album._id)} style={{ marginLeft: '10px' }}>
                {favorites.has(album._id) ? '❤️' : '🤍'}
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron álbumes.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
