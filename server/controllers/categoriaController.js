const Categoria = require('../models/categoria');
const categoriaController = {
    
    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll();
            console.log(categorias); 
            res.json(categorias);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    getCategoriaByID: async (req, res) => {
        try {
            const categoria = await Categoria.findByPk(req.params.id);
            if (categoria) {
                res.json(categoria);
            } else {
                res.status(404).send('Categoría no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    createCategoria: async (req, res) => {
        try {
            const nuevaCategoria = await Categoria.create(req.body);
            res.status(201).json(nuevaCategoria);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    updateCategoria: async (req, res) => {
        try {
            const [updated] = await Categoria.update(req.body, {
                where: { id_categoria: req.params.id }
            });
            if (updated) {
                const categoriaActualizada = await Categoria.findByPk(req.params.id);
                res.status(200).json(categoriaActualizada);
            } else {
                res.status(404).send('Categoría no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    deleteCategoria: async (req, res) => {
        try {
            const deleted = await Categoria.destroy({
                where: { id_categoria: req.params.id }
            });
            if (deleted) {
                res.status(204).send('Categoría eliminada');
            } else {
                res.status(404).send('Categoría no encontrada');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = categoriaController;