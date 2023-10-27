const router = require('express').Router();
const auth = require('./router/auth');
const verifyToken = require('./router/verifyToken');
const user = require('./router/user');
const question = require('./router/question');

router.use('/login', auth);
router.use('/user', verifyToken, user);
router.use('/question', verifyToken, question);

module.exports = router;
