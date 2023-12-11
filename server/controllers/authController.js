// authController.js
require('dotenv').config();
const User = require('../models/usuario'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 


    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Comprobar si la contraseña coincide
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET, 
                { expiresIn: '1h' } // 
            );
            console.log('Inicio de sesión exitoso');
            res.json({ token, user: { nickname: user.nickname,id_usuario: user.id_usuario, foto_perfil_url: user.foto_perfil_url  } });
        } catch (error) {
            console.error('Error en el servidor:', error);
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    };
    exports.register = async (req, res) => {
        const { email, password, nickname } = req.body;
    
        // Verificar si el email o el nickname ya existen
        const emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }
        const nicknameExists = await User.findOne({ where: { nickname: nickname } });
        if (nicknameExists) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }
    
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Crear el nuevo usuario
        const newUser = await User.create({
            email,
            password_hash: hashedPassword,
            nickname
        });
    
        // Responder con el estado 201 y un mensaje de éxito
        res.status(201).json({ message: 'Usuario registrado con éxito', user: { id: newUser.id, email, nickname } });
  
    // Crear un token JWT para el nuevo usuario
    const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' });
 }
exports.checkEmail = async (req, res) => {
    console.log("checkEmail recibido: ", req.body);
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        } else {
            res.status(200).json({ message: 'El correo electrónico está disponible' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error en el servidor', error: error.message });
    }
};
exports.checkNickname = async (req, res) => {
    console.log("checkNickname recibido: ", req.body);
    try {
        const { nickname } = req.body;
        const user = await User.findOne({ where: { nickname: nickname } });
        if (user) {
            res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        } else {
            res.status(200).json({ message: 'El nombre de usuario está disponible' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error en el servidor', error: error.message });
    }
};