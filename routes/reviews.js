// routes/reviews.js - Routes pour les avis
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const Student = require('../models/Student');
const Professor = require('../models/Professor');

// GET - Tous les avis
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('book', 'title isbn')
      .populate('reviewer', 'firstName lastName email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Avis pour un livre spécifique
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('reviewer', 'firstName lastName email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Un avis par ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('book')
      .populate('reviewer');
    if (!review) {
      return res.status(404).json({ error: 'Avis non trouvé' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer un nouvel avis
router.post('/', async (req, res) => {
  try {
    const { bookId, reviewerId, reviewerType, rating, comment, isRecommended } = req.body;

    // Vérifier si l'utilisateur a déjà donné un avis pour ce livre
    const existingReview = await Review.findOne({
      book: bookId,
      reviewer: reviewerId,
      reviewerType
    });

    if (existingReview) {
      return res.status(400).json({ error: 'Vous avez déjà donné un avis pour ce livre' });
    }

    const review = new Review({
      book: bookId,
      reviewer: reviewerId,
      reviewerType,
      rating,
      comment,
      isRecommended
    });

    await review.save();

    // Mettre à jour les relations bidirectionnelles
    await Book.findByIdAndUpdate(
      bookId,
      { $push: { reviews: review._id } }
    );

    const ReviewerModel = reviewerType === 'Student' ? Student : Professor;
    await ReviewerModel.findByIdAndUpdate(
      reviewerId,
      { $push: { reviews: review._id } }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Mettre à jour un avis
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Avis non trouvé' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Supprimer un avis
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Avis non trouvé' });
    }

    // Nettoyer les relations
    await Book.findByIdAndUpdate(
      review.book,
      { $pull: { reviews: req.params.id } }
    );

    const ReviewerModel = review.reviewerType === 'Student' ? Student : Professor;
    await ReviewerModel.findByIdAndUpdate(
      review.reviewer,
      { $pull: { reviews: req.params.id } }
    );

    res.json({ message: 'Avis supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
