const mongoose = require('./index');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
  community: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;