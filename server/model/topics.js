const mongoose = require('./index');

const topicSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  title: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;