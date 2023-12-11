const Transaccion = require('../models/transaccion');
const articuloController = require('./articuloController');
const transaccionController = {
    
    getAllTransacciones: async (req, res) => {
        try {
            const transacciones = await Transaccion.findAll();
            res.json(transacciones);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getTransaccionById: async (req, res) => {
        try {
            const transaccion = await Transaccion.findByPk(req.params.id);
            if (transaccion) {
                res.json(transaccion);
            } else {
                res.status(404).send('Transacción no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createTransaccion: async (req, res) => {
        try {
            const nuevoTransaccion = await Transaccion.create(req.body);
            res.status(201).json(nuevoTransaccion);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateTransaccion: async (req, res) => {
        try {
            const [updated] = await Transaccion.update(req.body, {
                where: { id_transaccion: req.params.id }
            });
            if (updated) {
                const transaccionActualizada = await Transaccion.findByPk(req.params.id);
                res.status(200).json(transaccionActualizada);
            } else {
                res.status(404).send('Transacción no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
},
    deleteTransaccion: async (req, res) => {
        try {
            const deleted = await Transaccion.destroy({
                where: { id_transaccion: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Transacció́n eliminada');
            } else {
                res.status(404).send('Transacció́n no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = transaccionController;