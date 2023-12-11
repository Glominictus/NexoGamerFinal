const express = require("express");
const router = express.Router();
const transaccionController = require("../controllers/transaccionController");

router.get("/", transaccionController.getAllTransacciones);
router.get("/:id", transaccionController.getTransaccionById);
router.post("/", transaccionController.createTransaccion);
router.put("/:id", transaccionController.updateTransaccion);
router.delete("/:id", transaccionController.deleteTransaccion);

module.exports = router;