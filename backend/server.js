// IMPORTACIONES
import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/mongoose.config.js';
import cors from 'cors';

// IMPORTACION DE ROUTES
import userRoutes from './routes/user.routes.js';
import albumRoutes from './routes/album.routes.js';
import sessionRoutes from './routes/session.routes.js';

dotenv.config(); 
const app = express(); 
const PORT = process.env.PORT || 3001; 

// CONFIGURACIONES
app.use(express.json()); // SOPORTE PARA FORMATO JSON

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true,
})); 

// USO DE RUTAS
app.use("/api/users", userRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/session", sessionRoutes);

// Crear la conexión con la base de datos
dbConnect();


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// servidor
app.listen(PORT, () => {
    
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
