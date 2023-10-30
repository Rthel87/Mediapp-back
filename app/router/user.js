const router = require('express').Router();
const userController = require('../controllers/userController')

router.get('/data', function (req, res) {
  userController.user(req, res);
})

module.exports = router;
