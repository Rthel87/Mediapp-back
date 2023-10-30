const router = require('express').Router();
const auth = require('./router/auth');
const verifyToken = require('./router/verifyToken');
const user = require('./router/user');
const question = require('./router/question');
const professional = require('./router/professional');
const assignment = require('./router/assignment');
const public = require('./router/public');

router.use('/login', auth);
router.use('/public', public);
router.use('/users', verifyToken, user);
router.use('/questions', verifyToken, question);
router.use('/professionals', verifyToken, professional);
router.use('/assignments', verifyToken, assignment);

module.exports = router;
