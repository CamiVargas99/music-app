// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado de autorización

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = decoded; // Guardar los datos del usuario decodificados en req.user
    next(); // Continuar con el siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;
