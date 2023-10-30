const router = require('express').Router();
const questionController = require('../controllers/questionController');
const professionalController = require('../controllers/professionalController');
const assignmentController = require('../controllers/assignmentController');

router.get('/questions', (req, res) => {
  questionController.index(req, res);
});

router.get('/professionals', (req, res) => {
  professionalController.index(req, res);
});

router.post('/assignment', (req, res) => {
  assignmentController.create(req, res);
});

module.exports = router;
