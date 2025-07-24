const mongoose = require('./index');

const communitySchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: false },
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;