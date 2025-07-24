const router = require('express').Router();
const { getUsers, getUser, createUser, getCommunity, getCommunities, createCommunity, getPosts, getPostById, getPostsByTopic, createPost, getComments, createComment, getTopics, createTopic} = require('./controllers/controllers');

//User
router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.post('/user', createUser);

//Community
router.get('/community', getCommunities);
router.get('/community/:userId', getCommunity);
router.post('/community', createCommunity);

//Posts
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.get('/:topic/posts', getPostsByTopic);
router.post('/:topic/posts', createPost);

//Comment
router.get('/comments', getComments);
router.post('/comments', createComment);

//Topics
router.get('/topics', getTopics);
router.post('/:community/topics', createTopic);

module.exports = router;
