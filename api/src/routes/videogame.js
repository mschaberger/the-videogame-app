const { Router } = require('express'); 
const router = Router(); 
const { Videogame, Genre } = require('../db'); //importo el modelo
const axios = require('axios').default;
const { YOUR_API_KEY } = process.env;



//[ ] GET /videogame/{idVideogame}:
//Obtener el detalle de un videojuego en particular, se obtiene el ID por params:
//si el ID es corto, el VG es de la API, se hace el pedido a la API y se busca por id:
//si el ID es largo, el VG es de la base de datos, se hace un findOne del modelo where id=pk
//Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//Incluir los géneros asociados

router.get('/:id', async (req, res, next) => {
    const pK = req.params.id;
    let gameDetail;
    if (pK.includes('-')) {
        try {
        //que busque un juego en la BD donde id = pK, y que incluya el atributo name del modelo Genre.
            gameDetail = await Videogame.findOne({
                where: {
                    id: pK,
                },
                include: {
                    model: Genre,
                    attributes: ['name'],
                },
            });
        } catch (error) {
            next(error);
        }
    }
    else {
        try {
            const apiSearch = await axios.get(`https://api.rawg.io/api/games/${pK}?key=${YOUR_API_KEY}`);
            const game = apiSearch.data;
            gameDetail = {
                id: game.id,
                name: game.name,
                description: game.description_raw,
                image: game.background_image,
                rating: game.rating,
                released: game.released,
                genres: game.genres,
                platforms: game.platforms.map((p) => p.platform.name).join(', '),
            }
        } catch (error) {
            next(error);
        }
    }
    if (gameDetail) {
        res.json(gameDetail);
    } else {
        res.status(404).send({message: 'Game not found'});
    }
});


//[ ] POST /videogame:
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de datos
//usamos async-await para esperar que se cree el registro del nuevo juego en la base de datos
//next en las rutas va al siguiente middleware, pero en este caso el siguiente middleware es el control de errores:
//usamos next porque esta seteado el control centralizado de errores, y asi devuelve exactamente cual es el error. 
//status 201 porque estamos creando algo 
//.create y .findAll son metodos de sequelize, addGenre es un mixin de sequelize.
router.post('/', async (req, res, next) => {
    const { name, image, genres, description, released, rating, platforms, fromDb } = req.body;
    try {
        const newVideogame = await Videogame.create ({
            name,
            image,
            description,
            released,
            rating,
            platforms,
            fromDb,
        });
        //busco todos los generos que coinciden con los de la base de datos y los guardo en una variable:
        let genresDb = await Genre.findAll({ 
            where: {
                name: genres,
            },
        });
        //agrego los generos al newGame creado:
        newVideogame.setGenres(genresDb);
        res.status(201).json(newVideogame);
    } catch (error) {
        next(error);
    }
});

//router.delete('/:id', async (req, res, next) => {
//    const pK = req.params.id;
//    const findGamebyId = await Videogame.findByPk(pK);
//
//    try {
//        if(!findGamebyId) {
//            return res.status(404).send({message: 'Game not found'})
//        } 
//        else {
//            const gameDeleted = findGamebyId.destroy();
//            !gameDeleted 
//                ? res.status(404).send({message: 'The game was not deleted'})
//                : res.status(200).send({message: 'The game was successfully deleted'});
//        }
//    } catch (error) {
//        next(error);
//    }
//});


module.exports = router;
