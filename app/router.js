const router = require('express').Router();
const auth = require('./router/auth');

router.use('/login', auth);

module.exports = router;
