const router = require('express').Router();
const { getUsers, createUser } = require('./controllers/controllers');

router.get('/user', getUsers);
router.post('/user', createUser);

module.exports = router;
