const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// require('dotenv').config()

const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");
// const studentRoutes = require('./routes/students');
// const professorRoutes = require('./routes/professors');
const categoryRoutes = require("./routes/categories");
const userRoutes = require("./routes/auth");
const borrowingRoutes = require("./routes/borrowings");
const reviewRoutes = require("./routes/reviews");
const departmentRoutes = require("./routes/departments");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CONNEXION À LA BASE DE DONN EE
mongoose.connect(process.env.DATABASE).then(() => {
  console.log("Connexion réussie");
});

const port = process.env.PORT || 5000;

app.use("/api/auth", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/professors', professorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/borrowings", borrowingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/departments", departmentRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = app;

// LOCAL, EN LIGNE
// Les deux
// La base de donnée Local comme base de donnée de développement
// La base de donnée en ligne comme base de donnée de production
