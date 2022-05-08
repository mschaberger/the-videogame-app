const { Router } = require('express'); 
const router = Router(); 
const { Videogame } = require('../db'); //importo el modelo

//[ ] GET /videogame/{idVideogame}:
//Obtener el detalle de un videojuego en particular
//Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//Incluir los géneros asociados

router.get('/', (req, res, next) => {
    res.send('Soy get /videogame/{idVideogame}');
});


//[ ] POST /videogame:
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de datos
//usamos async-await para esperar que se cree el registro del nuevo juego en la base de datos

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
        res.send(newVideogame);
    } catch (error) {
        next(error)
    }
});



module.exports = router;
