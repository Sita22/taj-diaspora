const router = require('express').Router();
const { getUsers, getUser, createUser, getCommunities, createCommunity, getPosts, createPost, getComments, createComment, getTopics, createTopic} = require('./controllers/controllers');

router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.post('/user', createUser);
router.get('/community', getCommunities);
router.post('/community', createCommunity);
router.get('/:topic/posts', getPosts);
router.post('/:topic/posts', createPost);
router.get('/comments', getComments);
router.post('/comments', createComment);
router.get('/topics', getTopics);
router.post('/topics', createTopic);

module.exports = router;
