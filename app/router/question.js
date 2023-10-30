const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.get('/', (req, res) => {
  questionController.index(req, res);
});

router.post('/', (req, res) => {
  questionController.create(req, res);
});

router.put('/:id', (req, res) => {
  questionController.update(req, res);
});

router.patch('/:id', (req, res) => {
  questionController.update(req, res);
});

router.delete('/:id', (req, res) => {
  questionController.destroy(req, res);
});

module.exports = router;
