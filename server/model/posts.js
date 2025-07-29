const mongoose = require('./index');
const Topic = require('./topics')

const postSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  timestamp: { type: Date, default: Date.now, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', postSchema);


const addPost = async (postData) => {
  try {
    const addedPost = await Post.create(postData);
    const populatedPost = await Post.findById(addedPost._id)
    .populate("author")
    .populate("topicId")
    .exec();
    await Topic.findOneAndUpdate({ _id: postData.topicId }, { $push: { posts: addedPost._id } })
    console.log(addedPost)
    console.log(populatedPost)
    return populatedPost;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { Post, addPost };