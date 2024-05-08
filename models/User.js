const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  membership_status: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
