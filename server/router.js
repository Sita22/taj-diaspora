const router = require('express').Router();
const { getUsers, createUser, getCommunities, createCommunity, getPosts, createPost, getComments, createComment } = require('./controllers/controllers');

router.get('/user', getUsers);
router.post('/user', createUser);
router.get('/community', getCommunities);
router.post('/community', createCommunity);
router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/comments', getComments);
router.post('/comments', createComment);

module.exports = router;
