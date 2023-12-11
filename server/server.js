
require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const db = require('./config/database');
const imageRoutes = require('./routes/imageRoutes');
const articuloRoutes = require('./routes/articuloRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const consolaRoutes = require('./routes/consolaRoutes');
const generoRoutes = require('./routes/generoRoutes');
const juegoRoutes = require('./routes/juegoRoutes');
const mensajeRoutes = require('./routes/mensajeRoutes');
const merchandisingRoutes = require('./routes/merchandisingRoutes');
const plataformaRoutes = require('./routes/plataformaRoutes');
const tipoMerchandisingRoutes = require('./routes/tipoMerchandisingRoutes');
const transaccionRoutes = require('./routes/transaccionRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const loginRoutes = require ('./routes/loginRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Middlewares
app.use(express.json()); 
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true })); 
app.use('/api', imageRoutes);
app.use('/api/articulos', articuloRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/articulos', articuloRoutes);
app.use('/api/consolas', consolaRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/juegos', juegoRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/merchandising', merchandisingRoutes);
app.use('/api/plataformas', plataformaRoutes);
app.use('/api/tiposMerchandising', tipoMerchandisingRoutes);
app.use('/api/transacciones', transaccionRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api', loginRoutes);



const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
