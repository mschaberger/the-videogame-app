const { Router } = require('express'); 
const router = Router(); 
const { Videogame, Genre } = require('../db'); 
const axios = require('axios').default;
const { YOUR_API_KEY } = process.env;

//Obtiene el detalle de un videojuego en particular, segun el ID:
router.get('/:id', async (req, res, next) => {
    const pK = req.params.id;
    let gameDetail;
    if (pK.includes('-')) {
        try {
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
                website: game.website,
            }
        } catch (error) {
            next(error);
        }
    }
    if (gameDetail) {
        res.status(200).json(gameDetail);
    } else {
        res.status(404).json({message: 'Game not found'});
    }
});


//Postea un nuevo juego tomando los datos del formulario del front, lo guarda en la DB:
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
        let genresDb = await Genre.findAll({ 
            where: {
                name: genres,
            },
        });
        newVideogame.setGenres(genresDb);
        res.status(201).json(newVideogame);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
