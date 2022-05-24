const { Router } = require('express');
// Importar todos los routers:
const genresRouter = require('./genres.js');
const videogameRouter = require('./videogame.js');
const videogamesRouter = require('./videogames.js');


const router = Router();

// Configurar los routers, middlewares para crear las rutas:
router.use('/api/genres', genresRouter);
router.use('/api/videogame', videogameRouter);
router.use('/api/videogames', videogamesRouter);


module.exports = router;
