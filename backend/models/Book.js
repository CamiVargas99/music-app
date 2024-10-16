import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
  
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
