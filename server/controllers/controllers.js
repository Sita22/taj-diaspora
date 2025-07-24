const User = require("../model/users");
const Community = require("../model/comunities")
const Post = require("../model/posts")
const Comment = require("../model/comments")


//USER
exports.getUsers = async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

exports.createUser = async (req, res) => {
  try {
    const { email, username, name, city, country } = req.body;
    if (!email || !username || !city || !country) {
      res.send("Data is missing: either email, username, city or country");
      res.status(400);
    }
    const user = await User.insertOne(req.body);
    res.send(user);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}

//COMMUNITY
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
    const { city, country, description, member } = req.body;
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
    const result = await Post.find({});
    res.send(result);
    res.status(200);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}


exports.createPost= async (req, res) => {
  try {
    const { communityId, userId, title, content, timestamp, comments, likes } = req.body;
    if (!communityId || !userId || !title) {
      res.send("Data is missing: either communityId or UserId or title");
      res.status(400);
    }
    const post = await Post.insertOne(req.body);
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


exports.createComment= async (req, res) => {
  try {
    const { communityId, userId, title, content, timestamp, comments, likes } = req.body;
    if (!communityId || !userId || !title) {
      res.send("Data is missing: either communityId or UserId or title");
      res.status(400);
    }
    const post = await Comment.insertOne(req.body);
    res.send(post);
    res.status(201);
  } catch (err) {
    res.status(404);
    console.log(err);
    res.send(err);
  }
}