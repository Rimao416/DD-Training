const mongoose = require("mongoose");
const professorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    office: String,
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    borrowings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Professor", professorSchema);
