const { Router } = require('express');

// Importo todos los routers:
const genresRouter = require('./genres.js');
const videogameRouter = require('./videogame.js');
const videogamesRouter = require('./videogames.js');

const router = Router();

// Configuro los middlewares para crear las rutas:
router.use('/genres', genresRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);


module.exports = router;
