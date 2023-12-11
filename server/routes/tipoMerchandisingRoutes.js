const express = require('express');
const router = express.Router();
const tipoMerchandisingController = require('../controllers/tipoMerchandisingController');

router.get('/', tipoMerchandisingController.getAllTipoMerchandising);
router.get('/:id', tipoMerchandisingController.getTipoMerchandisingById);
router.post('/', tipoMerchandisingController.createTipoMerchandising);
router.put('/:id', tipoMerchandisingController.updateTipoMerchandising);
router.delete('/:id', tipoMerchandisingController.deleteTipoMerchandising);

module.exports = router;