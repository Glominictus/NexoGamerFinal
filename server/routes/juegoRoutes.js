const express = require('express');
const router = express.Router();
const JuegoController = require('../controllers/juegoController');

router.get('/', JuegoController.getAllJuegos);
router.get('/:id', JuegoController.getJuegosById);
router.post('/', JuegoController.createJuego);
router.put('/:id', JuegoController.updateJuego);
router.delete('/:id', JuegoController.deleteJuego);

module.exports = router;

