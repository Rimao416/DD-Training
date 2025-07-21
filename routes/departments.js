const express = require("express");
const router = express.Router();

const Department = require("../models/Department");
const Professor = require("../models/Professor");
const Student = require("../models/Student");

// GET Obtenir - Tous les départements
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// GET - Obtenir un département par son ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Departement non trouvé" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// POST Créer un nouveau département
router.post("/", async (req, res) => {
  console.log("Les données sont ", req.body);
  try {
    const department = new Department(req.body);
    await department.save();
    res.json({
      message: "Département enregistré avec succès",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// PUT Assigner un chef de département
router.put("/:id/head", async (req, res) => {
  try {
    const { professorId } = req.body;
    const department = await Department.findById(req.params.id);
    const professor = await Professor.findById(professorId);
    if (!department || !professor) {
      return res.status(404).json({
        error: "Départment ou professeur non trouvé",
      });
    }
    department.head = professeurId;
    await department.save();
    res.json({
      message: "Chef de département attribué avec succès",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// DELETE - Supprimer un département
router.delete("/:id", async (req, res) => {
  const department = await Debartment.findByIdAndDelete(req.params.id);
  res.json({
    message: "Departement supprimé",
  });
});
module.exports = router;
