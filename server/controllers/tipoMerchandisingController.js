const TipoMerchandising = require('../models/tipoMerchandising');
const tipoMerchandisingController = {
    getAllTipoMerchandising: async (req, res) => {
        try {
            const tipoMerchandising = await TipoMerchandising.findAll();
            res.json(tipoMerchandising);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getTipoMerchandisingById: async (req, res) => {
        try {
            const tipoMerchandising = await TipoMerchandising.findByPk(req.params.id);
            if (tipoMerchandising) {
                res.json(tipoMerchandising);
            } else {
                res.status(404).send('Tipo de Merchandising no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createTipoMerchandising: async (req, res) => {
        try {
            const nuevoTipoMerchandising = await TipoMerchandising.create(req.body);
            res.status(201).json(nuevoTipoMerchandising);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateTipoMerchandising: async (req, res) => {
        try {
            const [updated] = await TipoMerchandising.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const tipoMerchandisingActualizado = await TipoMerchandising.findByPk(req.params.id);
                res.status(200).json(tipoMerchandisingActualizado);
            } else {
                res.status(404).send('Tipo de Merchandising no encontrado');
            }
        }catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteTipoMerchandising: async (req, res) => {
        try {
            const deleted = await TipoMerchandising.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(200).send('Tipo de Merchandising eliminado');
            } else {
                res.status(404).send('Tipo de Merchandising no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = tipoMerchandisingController