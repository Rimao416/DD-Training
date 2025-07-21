const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "reviewerType",
    },
    reviewerType: {
      type: String,
      required: true,
      enum: ["Student", "Professor"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    isRecommended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports=mongoose.model("Review",reviewSchema)
