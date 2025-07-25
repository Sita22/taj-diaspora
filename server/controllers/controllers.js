const User = require("../model/users");
const Community = require("../model/comunities")
const { Post, addPost } = require("../model/posts")
const Comment = require("../model/comments")
const Topic = require("../model/topics")

//TODO remove not used code later

//USER
exports.getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.getUser = async (req, res) => {
  try {
    const userId = req.params["userId"];
    const result = await User.findOne({ _id: userId });
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

//! how can I improve this function?
//! Should I maybe instead of referencing the Ids, use the names or titles? For the FrontEnd? 
exports.createUser = async (req, res) => {
  try {
    const { email, username, city, country } = req.body;
    if (!email || !username || !city || !country) {
      res.send("Data is missing: either email, username, city or country");
      res.status(400);
    }
    const community = await Community.findOne({ city: city });
    const newUser = {
      ...req.body,
      community: community._id
    }
    const user = await User.insertOne(newUser);
    //! should I return here updated community? Then I need to add {new: true}
    const updateCommunity = await Community.findOneAndUpdate({ city: city }, { $push: { members: user.id } })
    res.status(201).send(user);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

//COMMUNITY
exports.getCommunity = async (req, res) => {
  // try {
  //   const userId = req.params["userId"];
  //   const result = await Community.findOne({ members.: userId });
  //   res.send(result);
  //   res.status(200);
  // } catch (err) {
  //   res.status(404);
  //   console.log(err);
  //   res.send(err);
  // }
}

exports.getCommunities = async (req, res) => {
  try {
    const result = await Community.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

exports.createCommunity = async (req, res) => {
  try {
    const { city, country } = req.body;
    if (!city || !country) {
      res.send("Data is missing: either city or country");
      res.status(400);
    }
    const community = await Community.insertOne(req.body);
    res.send(community);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

//POSTS
exports.getPosts = async (req, res) => {
  try {
    const result = await Post.find().populate("userId").exec();
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

exports.getPostById = async (req, res) => {
  try {
    const id = req.params["postId"];
    const result = await Post.findOne({ _id: id });
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}



exports.getPostsByTopic = async (req, res) => {
  try {
    const topicTitle = req.params["topic"];
    const topic = await Topic.findOne({ title: topicTitle });
    const result = await Post.find({ topicId: topic._id });
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.createPost = async (req, res) => {
  try {
    const topicTitle = req.params["topic"];
    const { userId, title } = req.body;
    if (!topicTitle || !userId || !title) {
      res.send("Data is missing: either topic or UserId or title");
      res.status(400);
    }
    const post = await addPost(req.body, topicTitle);
    res.send(post);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


//COMMENTS
exports.getComments = async (req, res) => {
  try {
    const result = await Comment.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.createComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    if (!postId || !userId || !content) {
      res.send("Data is missing: either postId or UserId or content");
      res.status(400);
    }
    const comment = await Comment.insertOne(req.body);
    const updatePost = await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment._id } });
    res.send(comment);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


//TOPIC
exports.getTopics = async (req, res) => {
  try {
    const result = await Topic.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.createTopic = async (req, res) => {
  try {
    const communityTitle = req.params["community"];
    const community = await Community.findOne({ city: communityTitle });
    const { title } = req.body;
    if (!community._id || !title) {
      res.send("Data is missing: either communityId or UserId or title");
      res.status(400);
    }
    const newTopic = {
      ...req.body,
      communityId: community._id
    }
    console.log(newTopic)
    const topic = await Topic.insertOne(newTopic);
    const updateCommunity = await Community.findOneAndUpdate({ city: communityTitle }, { $push: { topics: topic.id } })
    res.send(topic);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}
