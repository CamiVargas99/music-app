import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificamos que el email y la contraseña estén presentes
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }

        // Buscamos al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "¡Usuario no encontrado!" });
        }

        // Comparamos la contraseña ingresada con la almacenada (encriptada)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "¡Contraseña incorrecta!" });
        }

        // Generamos el token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Enviamos el token en la cookie y en la respuesta JSON
        res.status(200)
           .cookie("userToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
           .json({ token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validación de datos
        if (!firstName || firstName.length < 3) {
            return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres." });
        }
        if (!lastName || lastName.length < 3) {
            return res.status(400).json({ message: "El apellido debe tener al menos 3 caracteres." });
        }
        if (!email) {
            return res.status(400).json({ message: "El correo es requerido." });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
        }

        // Verificar si el correo ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El correo ya está registrado." });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        // Generar el token con 15 minutos de expiración
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Enviar el token en la cookie y en la respuesta JSON
        res.status(201)
           .cookie("userToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
           .json({ token });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

const logout = (req, res) => {
    res.status(200).clearCookie("userToken").json({ message: "Sesión cerrada correctamente" });
};

const session = (req, res) => {
    const token = req.cookies.userToken;

    if (!token) {
        return res.status(401).json({ message: "No hay sesión activa" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ userId: decoded.id });
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};

export default { login, register, logout, session };
