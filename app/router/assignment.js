const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/', (req, res) => {
  assignmentController.index(req, res);
});

router.get('/:id', (req, res) => {
  assignmentController.show(req, res);
})

module.exports = router;
