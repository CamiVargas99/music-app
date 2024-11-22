// controllers/album.controller.js
import Album from '../models/album.model.js';

// Crear un nuevo álbum
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear, genre, imageUrl, tracks } = req.body;

    const newAlbum = new Album({ title, artist, releaseYear, genre, imageUrl, tracks });
    await newAlbum.save();

    res.status(201).json(newAlbum);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    } else if (error.code === 11000) {
      return res.status(400).json({ message: 'El título del álbum debe ser único' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los álbumes
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los álbumes' });
  }
};

// Obtener un álbum por ID
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el álbum' });
  }
};

// Actualizar un álbum por ID
export const updateAlbum = async (req, res) => {
  try {
    const { title, artist, releaseYear, genre, imageUrl, tracks } = req.body;
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { title, artist, releaseYear, genre, imageUrl, tracks },
      { new: true, runValidators: true }
    );

    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.status(200).json(album);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: errors.join(', ') });
    }
    res.status(500).json({ message: 'Error al actualizar el álbum' });
  }
};

// Eliminar un álbum por ID
export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });
    res.status(200).json({ message: 'Álbum eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el álbum' });
  }
};

// Agregar una canción a un álbum existente
export const addTrackToAlbum = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const album = await Album.findById(req.params.id);

    if (!album) return res.status(404).json({ message: 'Álbum no encontrado' });

    album.tracks.push({ title, duration });
    await album.save();

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la canción' });
  }
};
