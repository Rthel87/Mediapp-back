const router = require('express').Router();
const professionalController = require('../controllers/professionalController');

router.get('/', (req, res) => {
  professionalController.index(req, res);
});

router.post('/', (req, res) => {
  professionalController.create(req, res);
});

router.get('/:id', (req, res) => {
  professionalController.show(req, res);
});

router.put('/:id', (req, res) => {
  professionalController.update(req, res);
});

router.patch('/:id', (req, res) => {
  professionalController.update(req, res);
});

router.delete('/:id', (req, res) => {
  professionalController.destroy(req, res);
});

router.post('/assignment', (req, res) => {

});

module.exports = router;
