// models/album.model.js
import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la canción es obligatorio'],
    minlength: [3, 'El título debe tener al menos 3 caracteres']
  },
  duration: {
    type: String,
    required: [true, 'La duración de la canción es obligatoria'],
    match: [/^\d{2}:\d{2}$/, 'La duración debe tener el formato mm:ss'] // Ejemplo: 03:45
  }
});

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del álbum es obligatorio'],
    minlength: [5, 'El título debe tener al menos 5 caracteres'],
    unique: true
  },
  artist: {
    type: String,
    required: [true, 'El nombre del artista es obligatorio'],
    minlength: [3, 'El nombre del artista debe tener al menos 3 caracteres']
  },
  releaseYear: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: [1900, 'El año de lanzamiento debe ser mayor o igual a 1900']
  },
  genre: {
    type: String,
    required: [true, 'El género es obligatorio'],
    minlength: [3, 'El género debe tener al menos 3 caracteres']
  },
  imageUrl: {
    type: String,
    required: [true, 'La URL de la imagen es obligatoria'],
    match: [/\.(jpg|jpeg|png|gif)$/i, 'La URL de la imagen debe terminar en .jpg, .jpeg, .png o .gif']
  },
  tracks: [trackSchema]  // Lista de canciones
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);

export default Album;
