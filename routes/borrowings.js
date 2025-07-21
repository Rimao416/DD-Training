// routes/borrowings.js - Routes pour les emprunts
const express = require('express');
const router = express.Router();
const Borrowing = require('../models/Borrowing');
const Book = require('../models/Book');
const Student = require('../models/Student');
const Professor = require('../models/Professor');

// GET - Tous les emprunts
router.get('/', async (req, res) => {
  try {
    const borrowings = await Borrowing.find()
      .populate('book', 'title isbn')
      .populate('borrower', 'firstName lastName email');
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Emprunts en cours
router.get('/active', async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ isReturned: false })
      .populate('book', 'title isbn')
      .populate('borrower', 'firstName lastName email');
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Emprunts en retard
router.get('/overdue', async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ isOverdue: true, isReturned: false })
      .populate('book', 'title isbn')
      .populate('borrower', 'firstName lastName email');
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Un emprunt par ID
router.get('/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id)
      .populate('book')
      .populate('borrower');
    if (!borrowing) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer un nouvel emprunt
router.post('/', async (req, res) => {
  try {
    const { bookId, borrowerId, borrowerType, dueDate } = req.body;

    // Vérifier la disponibilité du livre
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ error: 'Livre non disponible' });
    }

    // Créer l'emprunt
    const borrowing = new Borrowing({
      book: bookId,
      borrower: borrowerId,
      borrowerType,
      dueDate: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    await borrowing.save();

    // Mettre à jour les relations bidirectionnelles
    book.availableCopies -= 1;
    book.borrowings.push(borrowing._id);
    await book.save();

    const BorrowerModel = borrowerType === 'Student' ? Student : Professor;
    await BorrowerModel.findByIdAndUpdate(
      borrowerId,
      { $push: { borrowings: borrowing._id } }
    );

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Retourner un livre
router.put('/:id/return', async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }

    if (borrowing.isReturned) {
      return res.status(400).json({ error: 'Livre déjà retourné' });
    }

    borrowing.isReturned = true;
    borrowing.returnDate = new Date();
    await borrowing.save();

    await Book.findByIdAndUpdate(
      borrowing.book,
      { $inc: { availableCopies: 1 } }
    );

    res.json(borrowing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Supprimer un emprunt
router.delete('/:id', async (req, res) => {
  try {
    const borrowing = await Borrowing.findByIdAndDelete(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }

    await Book.findByIdAndUpdate(
      borrowing.book,
      { $pull: { borrowings: req.params.id } }
    );

    const BorrowerModel = borrowing.borrowerType === 'Student' ? Student : Professor;
    await BorrowerModel.findByIdAndUpdate(
      borrowing.borrower,
      { $pull: { borrowings: req.params.id } }
    );

    res.json({ message: 'Emprunt supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
