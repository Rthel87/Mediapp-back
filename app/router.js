const router = require('express').Router();
const auth = require('./router/auth');
const verifyToken = require('./router/verifyToken');
const user = require('./router/user');

router.use('/login', auth);
router.use('/user', verifyToken, user);

module.exports = router;
