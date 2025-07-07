# Devoir Node.js : CRUD Complet sur un Fichier JSON

## Contexte

Tu dois créer une API HTTP REST avec **Node.js sans framework** (pas d’Express). Cette API permet de **gérer une liste d'utilisateurs** stockée dans un **fichier JSON local** (`users.json`).

---

## Objectifs pédagogiques

- Comprendre la manipulation des fichiers avec `fs` (`fs.promises` recommandé)
- Maîtriser les méthodes HTTP : GET, POST, PUT, DELETE
- Travailler avec un serveur `http` de Node.js
- Structurer proprement ton code
- Gérer les erreurs et les cas limites

---

## Stack et contraintes techniques

- **Langage** : Node.js
- **Framework** : Aucun (pas d’Express)
- **Modules autorisés** : uniquement les modules natifs (`fs`, `http`, `url`, etc.)
- **Encodage** : `UTF-8`
- **Port d’écoute** : `3000`
- **Type MIME** : `application/json`

---

## Fichier JSON fourni

Crée un fichier `data/users.json` avec le contenu suivant :

```
[
  {
    "id": 1,
    "nom": "Doe",
    "prenom": "John",
    "email": "john.doe@example.com",
    "age": 30
  },
  {
    "id": 2,
    "nom": "Smith",
    "prenom": "Anna",
    "email": "anna.smith@example.com",
    "age": 25
  }
]
 ```

## Endpoints à implémenter
Méthode	Route	Description

* GET	/users	Retourne tous les utilisateurs
* GET	/users/:id	Retourne un utilisateur spécifique
* POST	/users	Crée un nouvel utilisateur
* PUT	/users/:id	Met à jour un utilisateur existant
* DELETE	/users/:id	Supprime un utilisateur

## Règles à suivre
Structure de projet

```
projet-crud-json/
│
├── serveur.js
├── controllers/
│   └── userController.js
├── utils/
│   └── file.js
├── data/
│   └── users.json
```

### Recommandations

* Utiliser fs.promises pour lire/écrire dans le fichier

* Créer des fonctions réutilisables :

* readUsers()

* writeUsers(data)

* Utiliser des try/catch pour la gestion d’erreurs

* Retourner les bons codes HTTP :

200 OK

201 Created

400 Bad Request

404 Not Found

Ajouter les champs createdAt et updatedAt dans les utilisateurs

Vérifier qu’un utilisateur existe avant update/delete

```
{
  "message": "Utilisateur créé avec succès",
  "user": {
    "id": 3,
    "nom": "Kayumba",
    "prenom": "Omari",
    "email": "kayumba@example.com",
    "age": 27,
    "createdAt": "2025-07-07T20:52:00.000Z",
    "updatedAt": "2025-07-07T20:52:00.000Z"
  }
}
```

## Bonus (facultatif)

* Ajouter une recherche par nom : GET /users?q=doe

* Ajouter une pagination : GET /users?limit=5&offset=10

* Écrire un journal des actions dans logs.txt (création, suppression…)

### Modalités de remise
Sur Github

Le projet doit être exécutable avec : node serveur.js

Teste toutes les routes avec Postman ou curl avant de remettre

### Besoin d’aide ?

Tu peux demander un starter kit avec :

Un serveur.js de base

Des helpers pour readUsers() et writeUsers()

Un squelette du userController