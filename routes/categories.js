// routes/categories.js - Routes pour les catégories
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET - Toutes les catégories avec hiérarchie
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('parent', 'name')
      .populate('children', 'name')
      .populate('books', 'title');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Catégories racines (sans parent)
router.get('/root', async (req, res) => {
  try {
    const categories = await Category.find({ parent: null })
      .populate('children', 'name')
      .populate('books', 'title');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Une catégorie par ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent')
      .populate('children')
      .populate('books');
    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer une nouvelle catégorie
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();

    // Si elle a un parent, l'ajouter à la liste des enfants du parent
    if (category.parent) {
      await Category.findByIdAndUpdate(
        category.parent,
        { $push: { children: category._id } }
      );
    }

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - Mettre à jour une catégorie
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Supprimer une catégorie
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }

    // Nettoyer les relations parent-enfant
    if (category.parent) {
      await Category.findByIdAndUpdate(
        category.parent,
        { $pull: { children: req.params.id } }
      );
    }

    res.json({ message: 'Catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
