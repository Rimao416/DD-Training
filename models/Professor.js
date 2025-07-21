const mongoose = require("mongoose");
const professorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
});
