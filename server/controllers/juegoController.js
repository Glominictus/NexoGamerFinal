const Juego = require('../models/juego');
const JuegoController = {

    getAllJuegos: async (req, res) => {
        try {
            const juegos = await Juego.findAll();
            res.json(juegos);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getJuegosById: async (req, res) => {
        try {
            const juego = await Juego.findByPk(req.params.id);
            if (juego) {
                res.json(juego);
            } else {
                res.status(404).send('Juego no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createJuego: async (req, res) => {
        try {
            const nuevoJuego = await Juego.create(req.body);
            res.status(201).json(nuevoJuego);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateJuego: async (req, res) => {
        try {
            const [updated] = await Juego.update(req.body, {
                where: { id_juego: req.params.id }
            });
            if (updated) {
                const juegoActualizado = await Juego.findByPk(req.params.id);
                res.status(200).json(juegoActualizado);
            } else {
                res.status(404).send('Juego no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteJuego: async (req, res) => {
        try {
            const deleted = await Juego.destroy({
                where: { id_juego: req.params.id }
            });
            if (deleted) {
                res.status(200).json({ message: 'Juego eliminado correctamente' });
            } else {
                res.status(404).send('Juego no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
}

module.exports = JuegoController;