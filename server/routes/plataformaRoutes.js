const express = require('express');
const router = express.Router();
const plataformaController = require('../controllers/plataformaController');

router.get('/', plataformaController.getAllPlataformas);
router.get('/:id', plataformaController.getPlataformasById);
router.post('/', plataformaController.createPlataforma);
router.put('/:id', plataformaController.updatePlataforma);
router.delete('/:id', plataformaController.deletePlataforma);

module.exports = router;