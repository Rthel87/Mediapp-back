const router = require('express').Router();
const authenticationController = require('../controllers/authenticationController');

router.post('/', function (req, res) {
  authenticationController.login(req, res);
})

module.exports = router
