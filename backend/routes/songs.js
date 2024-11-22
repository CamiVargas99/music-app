const express = require('express');
const router = express.Router();
const Song = require('../models/Song'); 

router.put('/:id', async (req, res) => {
  const { title, artist, genre, album } = req.body;

  if (!title || !artist || !genre || !album) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, { title, artist, genre, album }, { new: true });
    if (!updatedSong) return res.status(404).json({ message: 'Canción no encontrada.' });
    res.json(updatedSong);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la canción.' });
  }
});

module.exports = router;
