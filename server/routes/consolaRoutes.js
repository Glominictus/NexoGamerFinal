const express = require('express');
const router = express.Router();
const consolaController = require('../controllers/consolaController');

router.get('/', consolaController.getAllConsolas);
router.get('/:id', consolaController.getConsolaById);
router.post('/', consolaController.createConsola);
router.put('/:id', consolaController.updateConsola);
router.delete('/:id', consolaController.deleteConsola);

module.exports = router;