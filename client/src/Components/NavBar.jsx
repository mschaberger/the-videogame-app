// - Input de búsqueda para encontrar videojuegos por nombre ---lo importo de searchbar
// - Boton con link to al componente de crear un nuevo videogame.
// - Botones para filtrar por género y por nombre de VG ---los defino aca
// - Botones para ordenar tanto ascendentemente como descendentemente los VG por orden alfabético y por rating ---los defino aca

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterByGenres, filterByDate, orderByName, orderByRating } from '../Redux/actions';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function NavBar() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);

    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
    }, []);
    
    function handleFilterGenres(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value));
    }
    
    function handleFilterDate(e) {
        e.preventDefault();
        dispatch(filterByDate(e.target.value));
    }
    
    function handleSortName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
    }
    
    function handleSortRanking(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
    }

    return (
        <header>
            <nav>
                <SearchBar/>

                <select className='Filtro' defaultValue='Genres' onChange={(e) => handleFilterGenres(e)}>
                    <option value='All'> All genres </option>
                    {genres && genres.map(e => (
                        <option key={e.id} value={e.name}> {e.name} </option>
                    ))}
                </select>

                <Link to = '/videogame'>
                    <button>Create your videogame</button>
                </Link>
            </nav>
        </header>
    )
}