// routes/album.routes.js
import express from 'express';
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  addTrackToAlbum
} from '../controllers/album.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD de álbumes (rutas protegidas con authMiddleware)
router.post('/', authMiddleware, createAlbum);           // Crear un álbum
router.get('/', authMiddleware, getAllAlbums);           // Obtener todos los álbumes
router.get('/:id', authMiddleware, getAlbumById);        // Obtener un álbum por ID
router.put('/:id', authMiddleware, updateAlbum);         // Actualizar un álbum por ID
router.delete('/:id', authMiddleware, deleteAlbum);      // Eliminar un álbum por ID

// Ruta para agregar una canción a un álbum específico
router.post('/:id/tracks', authMiddleware, addTrackToAlbum);  // Agregar una canción al álbum

export default router;
