const mongoose = require("mongoose");
const borrowingSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "borrowerType",
    },
    borrowerType: {
      type: String,
      required: true,
      enum: ["Student", "Professor"],
    },
    borrowDate: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: Date,
    isReturned: {
      type: Boolean,
      default: false,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware poru valvuler si l'emprunt est en retard
// borrowingSchema.pre("save", function (next) {
//   if (!this.isReturned && new Date() > this.dueDate) {
//     this.isOverdue = true;
//   }
//   next()
// });

module.exports = mongoose.model("Borrowing", borrowingSchema);
