import Book from '../models/Book.js'; 

// Obtener todos los libros
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los libros', error });
    }
};

// Agregar un nuevo libro
export const addBook = async (req, res) => {
    const { title, author } = req.body;

    // Validación básica
    if (!title || !author) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const newBook = new Book({ title, author });

    try {
        await newBook.save();
        res.status(201).json({ message: 'Libro agregado correctamente', book: newBook });
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar el libro', error });
    }
};

// Actualizar un libro
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Validación básica
    if (!updates.title && !updates.author) {
        return res.status(400).json({ message: 'Al menos un campo debe ser actualizado.' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json({ message: 'Libro actualizado correctamente', book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el libro', error });
    }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el libro', error });
    }
};
