// routes/books.js - Routes pour les livres
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

// GET - Tous les livres avec leurs relations
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'firstName lastName')
      .populate('category', 'name')
      .populate('borrowings')
      .populate('reviews', 'rating comment reviewer')
      .populate('recommendedBy', 'firstName lastName');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Un livre par ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author')
      .populate('category')
      .populate('borrowings')
      .populate('reviews')
      .populate('recommendedBy');
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Livres disponibles
router.get('/available/list', async (req, res) => {
  try {
    const books = await Book.find({ availableCopies: { $gt: 0 } })
      .populate('author', 'firstName lastName')
      .populate('category', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer un nouveau livre
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const book = new Book(req.body);
    await book.save();

    // Mettre à jour les relations bidirectionnelles
    await Author.findByIdAndUpdate(
      book.author,
      { $push: { books: book._id } }
    );

    await Category.findByIdAndUpdate(
      book.category,
      { $push: { books: book._id } }
    );

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Mettre à jour un livre
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Supprimer un livre
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }

    // Nettoyer les relations
    await Author.findByIdAndUpdate(
      book.author,
      { $pull: { books: req.params.id } }
    );

    await Category.findByIdAndUpdate(
      book.category,
      { $pull: { books: req.params.id } }
    );

    res.json({ message: 'Livre supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
