const { Router } = require('express');
const router = Router();
const { Genre } = require('../db');
const axios = require('axios');
const { YOUR_API_KEY } = process.env;


//Obtiene los datos de la api y los guardo en la base de datos para usarlos desde ahí:
router.get("/", async (req, res, next) => {
    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
        genresAPI.data.results.forEach((p) => {
            Genre.findOrCreate({    
                where: { 
                    id: p.id, 
                    name: p.name 
                },
            });
        });
        const genresDB = await Genre.findAll(); 
        res.status(200).json(genresDB);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
