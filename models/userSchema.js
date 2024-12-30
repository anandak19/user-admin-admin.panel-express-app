const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userShema)