const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
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
    studentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    year: {
      type: Number,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    borrowings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Borrowing",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Student", studentSchema);
