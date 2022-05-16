const { Router } = require('express');
const router = Router();
const { Videogame, Genre, GameGenre } = require('../db');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;


//Traigo los datos de la API:
const getfromApi = async () => {
    try {
        const arrVideogames = [];
        let apiUrl = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;
  
        for (let i = 0; i < 5; i++) { //traigo las primeras 6 paginas de la API, para limitar la cantidad a 100 VG
            let pages = await axios.get(apiUrl);
            pages.data.results?.map((e) => {
                arrVideogames.push({
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    genres: e.genres?.map((el) => el.name), //genres es un array de objetos, el genero se obtiene de la propiedad name de c/objeto.
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms?.map((el) => el.platform.name), //platforms es una array de objetos, que tienen una prop platform que tmb es un objeto, las plataformas se obtienen de platform.name
                });
            });
            apiUrl = pages.data.next; //para 'pasar' a la siguiente pagina de la url
        }
        return arrVideogames;
    } catch (error) {
        console.log(error);
    }
};

//Traigo los datos de la BD:
const getFromDb = async () => {
    const infoDb = await Videogame.findAll({
        include: {
            model: Genre,
        },
    });
    const mapInfoDb = infoDb?.map((e) => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            genres: e.genres?.map((e) => e.name), 
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms?.map((el) => el), 
            fromDb: e.fromDb,
        };
    });
    return mapInfoDb;
};

//Junto todos los datos:
const getAllVideogames = async () => {
    const dataFromApi = await getfromApi();
    const dataFromDb = await getFromDb();
    const allData = dataFromDb.concat(dataFromApi);
    return allData;
};

//Tomo el name de la query si me lo pasan lo comparo con todos mis datos (de la BD+API),
//devuelvo los primeros 15 VG que matchean con ese name.
//Si no me pasan el name por query, traigo todos los videojuegos:
router.get("/", async (req, res, next) => {
    try {
        const { search } = req.query;
        const allVideogames = await getAllVideogames();
        if (search) {
            const containsName = allVideogames.filter((g) =>
                g.name.toLowerCase().includes(search.toLowerCase())
            );
            if (containsName.length) {
                return res.send(containsName);
            } else {
                return res.send({ error: `We couldn't find a videogame matching your search`});
            }
        } else {
            res.send(allVideogames);
        }
    } catch (error) {
        next(error);
    }
  });


module.exports = router;
