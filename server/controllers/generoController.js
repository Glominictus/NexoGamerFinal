const Genero = require('../models/genero');
const generoController = {

    getAllGeneros: async (req, res) => {
        try {
            const generos = await Genero.findAll();
            res.json(generos);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getGenerosById: async (req, res) => {
        try {
            const genero = await Genero.findByPk(req.params.id);
            if (genero) {
                res.json(genero);
            } else {
                res.status(404).send('Género no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createGenero: async (req, res) => {
        try {
            const nuevoGenero = await Genero.create(req.body);
            res.status(201).json(nuevoGenero);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateGenero: async (req, res) => {
        try {
            const [updated] = await Genero.update(req.body, {
                where: { id_genero: req.params.id }
            });
            if (updated) {
                const generoActualizado = await Genero.findByPk(req.params.id);
                res.status(200).json(generoActualizado);
            } else {
                res.status(404).send('Género no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteGenero: async (req, res) => {
        try {
            const deleted = await Genero.destroy({
                where: { id_genero: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Género eliminado');
            } else {
                res.status(404).send('Género no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
module.exports = generoController