const Consola = require('../models/consola');
const consolaController = {
    getAllConsolas: async (req, res) => {
        try {
            const consolas = await Consola.findAll();
            res.json(consolas);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getConsolaById: async (req, res) => {
        try {
            const consola = await Consola.findByPk(req.params.id);
            if (consola) {
                res.json(consola);
            } else {
                res.status(404).send('Consola no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createConsola: async (req, res) => {
        try {
            const nuevaConsola = await Consola.create(req.body);
            res.status(201).json(nuevaConsola);
        }catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateConsola: async (req, res) => {
        try {
            const [updated] = await Consola.update(req.body, {
                where: { id_consola: req.params.id }
            });
            if (updated) {
                const consolaActualizada = await Consola.findByPk(req.params.id);
                res.status(200).json(consolaActualizada);
            } else {
                res.status(404).send('Consola no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteConsola: async (req, res) => {
        try {
            const deleted = await Consola.destroy({
                where: { id_consola: req.params.id }
            });
            if(deleted){
                res.status(204).send('Consola eliminada');
            }else {
                res.status(404).send('Consola no encontrada');
            }
}catch(error) {
            res.status(500).send(error.message);
        }
    }
};
module.exports = consolaController;