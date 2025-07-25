const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  getCommunity,
  getCommunities,
  createCommunity,
  getPosts,
  getPostById,
  createPost,
  getComments,
  getCommentById,
  createComment,
  getTopics,
  createTopic,
  updatePostLike
} = require('./controllers/controllers');

//User
router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.post('/user', createUser);
router.post('/user/update', updateUser);

//Community
router.get('/community', getCommunities);
router.get('/community/:userId', getCommunity);
router.post('/community', createCommunity);

//Posts
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.post('/:topic/posts', createPost);
router.put('/posts/:postId/:userId/increment', updatePostLike);
router.put('/posts/:postId/:userId/decrement', updatePostLike);

//Comment
router.get('/comments', getComments);
router.get('/comments/:commentId', getCommentById);
router.post('/comments', createComment);

//Topics
router.get('/topics', getTopics);
router.post('/:community/topics', createTopic);

module.exports = router;
