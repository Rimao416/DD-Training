const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const Book = require('../models/Book');

// GET - Tous les auteurs
router.get('/', async (req, res) => {
try {

const authors = await Author.find().populate('books', 'title isbn publicationYear');
res.json(authors);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// GET - Un auteur par ID
router.get('/:id', async (req, res) => {
try {
const author = await Author.findById(req.params.id)
// const author = await Author.findById(req.params.id)(http://req.params.id/)).populate('books');
if (!author) {
return res.status(404).json({ error: 'Auteur non trouvé' });
}
res.json(author);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// POST - Créer un nouvel auteur
router.post('/', async (req, res) => {
try {
const author = new Author(req.body);
await author.save();
res.status(201).json(author);
} catch (error) {
res.status(400).json({ error: error.message });
}
});

// PUT - Mettre à jour un auteur
router.put('/:id', async (req, res) => {
try {
const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!author) {
return res.status(404).json({ error: 'Auteur non trouvé' });
}
res.json(author);
} catch (error) {
res.status(400).json({ error: error.message });
}
});

// DELETE - Supprimer un auteur
router.delete('/:id', async (req, res) => {
try {
const author = await Author.findByIdAndDelete(req.params.id)
if (!author) {
return res.status(404).json({ error: 'Auteur non trouvé' });
}
res.json({ message: 'Auteur supprimé' });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

module.exports = router;