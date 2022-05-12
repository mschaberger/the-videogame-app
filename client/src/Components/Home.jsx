//[ ] Área donde se verá el listado de videojuegos: se van a mostrar todas las GameCard.
//Va a tener el Navbar fijo con:
// - Input de búsqueda para encontrar videojuegos por nombre ---lo importo de navbar
// - Botones para filtrar por género y por nombre de VG ---lo importo de navbar
// - Botones para ordenar tanto ascendentemente como descendentemente los VG por orden alfabético y por rating ---lo importo del navbar
// - Paginado ---lo importo del paginado

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../Redux/actions/index.js';
import { Link } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch() //para utilizar esa constante para cada vez que quiera despachar un accion al store;
    const allVideogames = useSelector((state) => state.videogames) //lo mismo que hacer el mapstatetoprops
    
    //manejamos el estado del componente:
    useEffect(() => {
        dispatch(getAllVideogames())
    }, []) //vacio porque necesitamos que se ejecute cada vez que se monta

    //para volver al inicio y sacar los filtros/orden
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames);
    }

    return(
        <div>
            <Link to= '/videogame'>Create your game </Link>
            <h1>VIDEOGAMES</h1>
            <button onClick={(e) => {handleClick(e)}}>
                RESET
            </button>
            <div>

            </div>
        </div>
    )
}