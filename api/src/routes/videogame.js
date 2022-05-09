const { Router } = require('express'); 
const router = Router(); 
const { Videogame, Genre, GameGenre } = require('../db'); //importo el modelo
const axios = require('axios');


//[ ] GET /videogame/{idVideogame}:
//Obtener el detalle de un videojuego en particular, se hace el pedido al endpoint:
//https://api.rawg.io/api/games/{id}?key={YOUR_API_KEY}
//Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//Incluir los géneros asociados

router.get('/', (req, res, next) => {
    res.send('Soy get /videogame/{idVideogame}');
});


//[ ] POST /videogame:
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de datos
//usamos async-await para esperar que se cree el registro del nuevo juego en la base de datos
//next en las rutas va al siguiente middleware, pero en este caso el siguiente middleware es el control de errores:
//usamos next porque esta seteado el control centralizado de errores, y asi devuelve exactamente cual es el error. 
//status 201 porque estamos creando algo
router.post('/', async (req, res, next) => {
    try {
        const { name, description, released, rating, platforms } = req.body;
        const newVideogame = await Videogame.create ({
            name,
            description,
            released,
            rating,
            platforms
        });
        res.status(201).send(newVideogame);
    } catch (error) {
        next(error)
    }
});



module.exports = router;
