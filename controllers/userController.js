const { readUsers, writeUsers } = require("../utils/file");
const { v4: uuidv4 } = require("uuid");

// GET /users - Récupérer tous les utilisateurs
const getAllUsers = async (req, res, query) => {
  try {
    const users = await readUsers();
    const totalUsers = users.length;

    const response = {
      users,
      total: totalUsers,
    };

    res.writeHead(200);
    res.end(JSON.stringify(response, null, 2));
  } catch (error) {
    console.log("ERREUR GET ALL USERS", error);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: "Erreur lors de la récupération des utilisateurs",
        message: error.message,
      })
    );
  }
};

// GET /users/:id - Récupérer un utilisateur par ID
const getUserById = async (req, res, id) => {
  try {
    if (!id || isNaN(id)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "ID invalide",
          message: "L'id doit être un nombre entier",
        })
      );
      return;
    }

    const users = await readUsers();
    const user = users.find((u) => u.id == id); // attention == ici car id vient d'un paramètre URL (string)

    if (!user) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "Utilisateur non trouvé",
          message: `Aucun utilisateur avec l'ID ${id}`,
        })
      );
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({ user }, null, 2));
  } catch (error) {
    console.log("Erreur lors de l'obtention de l'utilisateur", error);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: "Erreur lors de la récupération de l'utilisateur",
        message: error.message,
      })
    );
  }
};

// Valider les données d'un utilisateur
const validateUser = (userData, isUpdate = false) => {
  const errors = [];
  if (!isUpdate && !userData.nom) errors.push("Le nom est requis");
  if (!isUpdate && !userData.prenom) errors.push("Le prénom est requis");
  if (!isUpdate && !userData.email) errors.push("Le mail est requis");
  if (!isUpdate && userData.age === undefined) errors.push("L'âge est requis");

  if (userData.email && !isValidEmail(userData.email)) {
    errors.push("Le format du mail est invalide");
  }

  return errors;
};

// Vérifie la validité d'un mail
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /users - Créer un nouvel utilisateur
const createUser = async (req, res, userData) => {
  try {
    const errors = validateUser(userData);
    if (errors.length > 0) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Données invalides",
          message: errors.join(", "),
        })
      );
      return;
    }

    const users = await readUsers();

    // Vérifier si l'utilisateur existe déjà par email
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Email déjà utilisé",
          message: "Cet email est déjà associé à un autre utilisateur",
        })
      );
      return;
    }

    const newUser = {
      id: uuidv4(), // 🔥 Utilisation de uuid ici
      nom: userData.nom,
      prenom: userData.prenom,
      email: userData.email,
      age: userData.age,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    res.writeHead(201);
    res.end(
      JSON.stringify(
        {
          message: "Utilisateur créé avec succès",
          user: newUser,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.log("Erreur lors de la création de l'utilisateur:", error);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: "Erreur serveur",
        message: error.message,
      })
    );
  }
};

// Update /:id users - mettre à jour un utilisateur
const updateUser = async (req, res, id, userData) => {
  try {
    if (!id || isNaN(id)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "ID Invalide",
          message: "L'identifiant est incorrect",
        })
      );
      return;
    }
    const errors = validateUser(userData, true);
    if (errors.length > 0) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Données invalides",
          message: errors.join(". "),
        })
      );
      return;
    }
    const users = await readUsers();

    const userIndex = users.findIndex((u) => u.id === id);
    console.log("Le userIndex est " + userIndex);
    if (userIndex === -1) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "Utilisateur non trouvé",
          message: "Aucun utilisateur trouvé avec Cet Id",
        })
      );
      return;
    }
    if (userData.email) {
      const existingUser = users.find(
        (u) => u.email === userData.email && u.id !== id
      );
      if (existingUser) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            error: "Email déjà utilisé",
            message: "Cet email est déjà utilisé ",
          })
        );
        return;
      }
    }
    // Mettre à jour l'utilisateur
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updateUser;
    await writeUsers(users);
    res.writeHead(200);
    res.send(
      JSON.stringify(
        {
          message: "Utilisateur crée avec succès",
          user: updateUser,
        },
        null,
        2
      )
    );
  } catch (error) {
    console.log("Erreur lors de la mise à jour");
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: "Erreur lors de la mise à jour",
        message: error.message,
      })
    );
  }
};

// DELETE /:id user, - supprimer un utilisateur
const deleteUser = async (req, res, id) => {
  try {
    if (!id || isNaN(id)) {
      res.writeHead(400);
      res.end(
        JSON.stringify({
          error: "ID Invalide",
          message: "L'identifiant est incorrect",
        })
      );
      return;
    }
    const users = await readUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "Utilisateur non trouvé",
          message: "Utilisateur non trouvé",
        })
      );
      return;
    }
    const deleteUser = users[userIndex];
    users.splice(userIndex, 1);
    await writeUsers(users);
    res.writeHead(200);
    res.end(
      JSON.stringify(
        {
          message: "Utilisateur supprimé avec succès",
          user: deleteUser,
        },
        null,
        2
      )
    );
  } catch (error) {}
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
