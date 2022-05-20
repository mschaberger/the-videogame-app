const { Router } = require('express');
const router = Router();
const { Genre } = require('../db'); //importo el modelo
const axios = require('axios');
const { YOUR_API_KEY } = process.env;

//obtengo los datos de la api con axios(devuelve una promesa) y los guardo en la base de datos para usarlos desde ahí:
//creará una entrada en la tabla a menos que pueda encontrar una que cumpla con las opciones de consulta. 
//En ambos casos, devolverá una instancia (ya sea la instancia encontrada o la instancia creada) y un booleano que indica si esa instancia fue creada o ya existía.

router.get("/", async (req, res, next) => {
    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
        genresAPI.data.results.forEach((p) => {
            Genre.findOrCreate({    //metodo de sequelize
                where: { id: p.id, name: p.name },
            });
        });
        const genresDB = await Genre.findAll(); //metodo de sequelize trae los generos de la base de datos
        res.json(genresDB);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
