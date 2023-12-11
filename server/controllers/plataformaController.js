const Plataforma = require('../models/plataforma');
const plataformaController = {
    getAllPlataformas: async (req, res) => {
        try {
            const plataformas = await Plataforma.findAll();
            res.json(plataformas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getPlataformasById: async (req, res) => {
        try {
            const plataforma = await Plataforma.findByPk(req.params.id);
            if (plataforma) {
                res.json(plataforma);
            } else {
                res.status(404).send('Plataforma no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createPlataforma: async (req, res) => {
        try {
            const nuevaPlataforma = await Plataforma.create(req.body);
            res.status(201).json(nuevaPlataforma);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updatePlataforma: async (req, res) => {
        try {
            const [updated] = await Plataforma.update(req.body, {
                where: { id_plataforma: req.params.id }
            });
            if (updated) {
                const plataformaActualizada = await Plataforma.findByPk(req.params.id);
                res.status(200).json(plataformaActualizada);
            } else {
                res.status(404).send('Plataforma no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deletePlataforma: async (req, res) => {
        try {
            const deleted = await Plataforma.destroy({
                where: { id_plataforma: req.params.id }
            });
            if(deleted) {
                res.status(204).send('Plataforma eliminada');
            } else {
                res.status(404).send('Plataforma no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
}
};
module.exports = plataformaController	