const mongoose = require('./index');

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: false },
  timestamp: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;