const mongoose = require('./index');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;