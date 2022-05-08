const { Router } = require('express');
const router = Router();
const { Genre } = require('../db'); //importo el modelo

//obtengo todos los datos de la base de datos con promesas: 

router.get('/', (req, res, next) => {
    return Genre.findAll()
    .then((genre) =>{
        res.send(genre)
    })
    .catch((error) => {
        next(error);
    })
});

//[ ] GET /genres:
//Obtener todos los tipos de géneros de videojuegos posibles
//En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

module.exports = router;
