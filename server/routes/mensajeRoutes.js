const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

router.get('/', mensajeController.getAllMensajes);
router.get('/:id', mensajeController.getMensajesById);
router.post('/', mensajeController.createMensaje);
router.put('/:id', mensajeController.updateMensaje);
router.delete('/:id', mensajeController.deleteMensaje);

module.exports = router;