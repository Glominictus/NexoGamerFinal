const express = require('express');
const router = express.Router();
const merchandisingController = require('../controllers/merchandisingController');

router.get('/', merchandisingController.getAllMerchandisings);
router.get('/:id', merchandisingController.getMerchandisingById);
router.post('/', merchandisingController.createMerchandising);
router.put('/:id', merchandisingController.updateMerchandising);
router.delete('/:id', merchandisingController.deleteMerchandising);

module.exports = router;