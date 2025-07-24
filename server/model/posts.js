const mongoose = require('./index');
const Topic = require('./topics')

const postSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  timestamp: { type: Date, default: Date.now, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);


const addPost = async (postData, topicTitle) => {
  try {
    const topic = await Topic.findOne({ title: topicTitle });
    const newPost = {
      "topicId": topic._id,
      ...postData
    }
    const addedPost = await Post.insertOne(newPost);
    const updateTopic = await Topic.findOneAndUpdate({ title: topicTitle }, { $push: { posts: addedPost._id } })
    return addedPost;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { Post, addPost };