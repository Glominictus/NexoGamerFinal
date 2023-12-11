const Usuario = require('../models/usuario');

const usuarioController = {
    // Obtener todos los usuarios
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getUsuarioById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createUsuario: async (req, res) => {
        try {
            const nuevoUsuario = await Usuario.create(req.body);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateUsuario: async (req, res) => {
        try {
            const [updated] = await Usuario.update(req.body, {
                where: { id_usuario: req.params.id }
            });
            if (updated) {
                const usuarioActualizado = await Usuario.findByPk(req.params.id);
                res.status(200).json(usuarioActualizado);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteUsuario: async (req, res) => {
        try {
            const deleted = await Usuario.destroy({
                where: { id_usuario: req.params.id }
            });
            if (deleted) {
                res.status(200).send('Usuario eliminado correctamente');
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = usuarioController;
