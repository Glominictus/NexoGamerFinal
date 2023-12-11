const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const Usuario = require('../models/usuario');
const Articulo = require('../models/articulo');

const imageController = {
    uploadUserImage: async (req, res) => {
        const imagePath = req.file ? path.join(__dirname, '..', req.file.path) : null;

        if (!imagePath) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            const formData = new FormData();
            formData.append('image', fs.createReadStream(imagePath));

            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
                headers: formData.getHeaders()
            });

            await Usuario.update({ foto_perfil_url: response.data.data.url }, {
                where: { id_usuario: req.body.id }
            });

            res.json({ success: true, imageUrl: response.data.data.url });
        } catch (error) {
            console.error('Error response:', error.response ? error.response.data : error);
            res.status(500).json({ success: false, message: 'Error al cargar la imagen', error: error.message });
        } finally {
            fs.unlinkSync(imagePath);
        }
    },

    uploadArticleImage: async (req, res) => {
        const imagePath = req.file ? path.join(__dirname, '..', req.file.path) : null;

        if (!imagePath) {
            return res.status(400).send('No file uploaded.');
        }

        try {
            const formData = new FormData();
            formData.append('image', fs.createReadStream(imagePath));

            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
                headers: formData.getHeaders()
            });

            await Articulo.update({ imagenes: response.data.data.url }, {
                where: { id_articulo: req.body.id }
            });

            res.json({ success: true, imageUrl: response.data.data.url });
        } catch (error) {
            console.error('Error response:', error.response ? error.response.data : error);
            res.status(500).json({ success: false, message: 'Error al cargar la imagen', error: error.message });
        } finally {
            try {
                fs.unlinkSync(imagePath);
            } catch (error) {
                console.error('Error deleting file:', error.message);
            }
        }
    }
};

module.exports = imageController;