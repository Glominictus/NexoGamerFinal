const Mensaje = require('../models/mensaje');
const mensajeController = {
    // Obtener todos los mensajes
    getAllMensajes: async (req, res) => {
        try {
            const mensajes = await Mensaje.findAll();
            res.json(mensajes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getMensajesById: async (req, res) => {
        try {
            const mensaje = await Mensaje.findByPk(req.params.id);
            if (mensaje) {
                res.json(mensaje);
            } else {
                res.status(404).send('Mensaje no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createMensaje: async (req, res) => {
        try {
            const nuevoMensaje = await Mensaje.create(req.body);
            res.status(201).json(nuevoMensaje);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateMensaje: async (req, res) => {
        try {
            const [updated] = await Mensaje.update(req.body, {
                where: { id_mensaje: req.params.id }
            });
            if (updated) {
                const mensajeActualizado = await Mensaje.findByPk(req.params.id);
                res.status(200).json(mensajeActualizado);
            } else {
                res.status(404).send('Mensaje no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteMensaje: async (req, res) => {
        try {
            const deleted = await Mensaje.destroy({
                where: { id_mensaje: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Mensaje eliminado');
            } else {
                res.status(404).send('Mensaje no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = mensajeController;