
import express from 'express';
import { getBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

// Ruta para obtener todos los libros
router.get('/', getBooks);

// Ruta para agregar un nuevo libro
router.post('/', addBook);

// Ruta para actualizar un libro existente
router.put('/:id', updateBook);

// Ruta para eliminar un libro
router.delete('/:id', deleteBook);

export default router;
