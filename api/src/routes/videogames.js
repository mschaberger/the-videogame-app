const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.send('Soy get /videogames');
});

router.get('/', (req, res, next) => {
    res.send('Soy /get /videogames?name=...');
});

//[ ] GET /videogames:
//Obtener un listado de los videojuegos
//Debe devolver solo los datos necesarios para la ruta principal

//[ ] GET /videogames?name="...":
//Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//Si no existe ningún videojuego mostrar un mensaje adecuado

module.exports = router;
