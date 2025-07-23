const mongoose = require('./index');

const communitySchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: false },
  //picture: { type: Date, default: Date.now, required: true },
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;