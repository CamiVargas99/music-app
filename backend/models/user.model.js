import { model, Schema } from 'mongoose';
import validateEmail from './utils/customValidations.js';
import bcrypt from 'bcrypt';

// MODELADO DE DATOS DEL ESQUEMA
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "¡El email es obligatorio!"],
        trim: true,
        lowercase: true,
        unique: [true, "¡El email ya existe!"],
        validate: [validateEmail, "Ingrese un email válido"] 
    },
    password: {
        type: String,
        required: [true, "¡El password es obligatorio!"],
        minLength: [6, "El password no puede ser menor a 6 caracteres"],
    }
}, { timestamps: true });

// ENCRIPTACIÓN DE CONTRASEÑA
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10); 
            this.password = await bcrypt.hash(this.password, salt); 
            next(); 
        } catch (error) {
            next(error); 
        }
    } else {
        next(); 
    }
});

// Crea el modelo de User
const User = model("User", UserSchema);

export default User;
