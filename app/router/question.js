const router = require('express').Router();
const questionController = require('../controllers/questionController');

router.get('/', (res, req) => {
  questionController.index(res, req);
});

router.post('/', (req, res) => {
  questionController.create(res, req);
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
