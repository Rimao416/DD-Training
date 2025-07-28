const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "manager", "adminitrateur"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    required: [true, "La confirmation du mot de passe est réquise"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Les mots de passe ne sont pas identiques",
    },
  },
  passwordChangeAt:Date,
  passwordResetToken:String,
  passwordResetExpires:Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const myPass = await bcrypt.compare(candidatePassword, userPassword);
  return myPass;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
