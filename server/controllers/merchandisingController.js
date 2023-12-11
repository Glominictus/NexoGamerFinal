const Merchandising = require('../models/merchandising');

const merchandisingController = {
    getAllMerchandisings: async (req, res) => {
        try {
            const merchandisings = await Merchandising.findAll();
            res.json(merchandisings);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getMerchandisingById: async (req, res) => {
        try {
            const merchandising = await Merchandising.findByPk(req.params.id);
            if (merchandising) {
                res.json(merchandising);
            } else {
                res.status(404).send('Merchandising no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    createMerchandising: async (req, res) => {
        try {
            const nuevoMerchandising = await Merchandising.create(req.body);
            res.status(201).json(nuevoMerchandising);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    updateMerchandising: async (req, res) => {
        try {
            const [updated] = await Merchandising.update(req.body, {
                where: { id_merchandasing: req.params.id }
            });
            if (updated) {
                const merchandisingActualizado = await Merchandising.findByPk(req.params.id);
                res.status(200).json(merchandisingActualizado);
            } else {
                res.status(404).send('Merchandising no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    deleteMerchandising: async (req, res) => {
        try {
            const deleted = await Merchandising.destroy({
                where: { id_merchandasing: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Merchandising eliminado');
            } else {
                res.status(404).send('Merchandising no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = merchandisingController;