const router = require('express').Router();
const { getUsers, getUser, createUser, getCommunity, getCommunities, createCommunity, getPosts, getPostsByTopic, createPost, getComments, createComment, getTopics, createTopic} = require('./controllers/controllers');

router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.post('/user', createUser);
router.get('/community', getCommunities);
router.get('/community/:usedId', getCommunity);
router.post('/community', createCommunity);
router.get('/posts', getPosts);
router.get('/:topic/posts', getPostsByTopic);
router.post('/:topic/posts', createPost);
router.get('/comments', getComments);
router.post('/comments', createComment);
router.get('/topics', getTopics);
router.post('/:community/topics', createTopic);

module.exports = router;
