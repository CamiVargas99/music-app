import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import authMiddleware from './Middleware/authMiddleware.js'; 
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();
const app = express();

// Middleware para parsear JSON
app.use(express.json()); 

// Rutas de usuario
app.use('/api', userRoutes); 

// Rutas de libros
app.use('/api/books', bookRoutes); // Asegúrate de que esta línea esté presente

// Middleware de autenticación para rutas protegidas (ejemplo)
app.use('/api/protected', authMiddleware, (req, res) => {
  res.send('Esta es una ruta protegida!');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Servidor en ejecución en el puerto ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));

