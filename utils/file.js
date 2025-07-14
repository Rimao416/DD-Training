const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const LOGS_FILE = path.join(DATA_DIR, "logs.txt");

// Fonction pour s'assurer que le répertoire existe
const ensureDataDirectory = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      console.log("Répertoire créé avec succès");
    } else {
      throw error;
    }
  }
};

const writeUsers = async (users) => {
  try {
    await ensureDataDirectory();
    //   Vérifier que Users est un tableau
    if (!Array.isArray(users)) {
      throw new Error("Les donées doivent être un tableau");
    }
    // Convertir en JSON
    const jsonData = JSON.stringify(users, null, 2);
    // Ecrire dans le fichier
    await fs.writeFile(USERS_FILE, jsonData, "utf-8");
    console.log("Fichier users.json mis à jour");
  } catch (error) {
    throw new Error("Erreur lors de l'écriture");
  }
};

// Fonction pour lire les utilisateurs
const readUsers = async () => {
  try {
    await ensureDataDirectory();
    try {
      await fs.access(USERS_FILE);
    } catch (error) {
      if (error.code === "ENOENT") {
        const defaultUsers = [
          {
            id: 1,
            nom: "Doe",
            prenom: "John",
            email: "john.doe@example.com",
            age: 30,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            nom: "Smith",
            prenom: "Anna",
            email: "anna.smith@example.com",
            age: 25,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        await writeUsers(defaultUsers);
        console.log("Le fichier a été créé avec succès");
        return defaultUsers;
      } else {
        throw error;
      }
    }

    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

// Fonction pour écrire les utilisateurs dans le fichier JSON

module.exports = { readUsers,writeUsers };
