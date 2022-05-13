import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterByGenres, filterByDate, orderByName, orderByRating } from '../Redux/actions/index.js';
import { Link } from 'react-router-dom';
import SearchBar from './4.SearchBar.jsx';
import '../CSS/3.navBar.css';
import logo from '../CSS/imagenes/gameovernegro.jpeg';


export default function NavBar() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);


    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
    }, [dispatch]);

    //FILTROS Y ORDENADORES
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
    //para volver al inicio y sacar los filtros/orden
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames);
    }


    return (
        <header  className='header'>

            <nav className='nav'>
                <Link to= '/home'>
                    <img src={logo} width="50" height="50"  alt="" />
                </Link>

                <SearchBar/>

                <Link to = '/videogame'>
                    <button>Create your videogame</button>
                </Link>
            </nav>

            <div className='sort-filter'>
                <select className='filter' defaultValue='Genres' onChange={(e) => handleFilterGenres(e)}>
                    <option value='All'> All genres </option>
                    {genres && genres.map(e => (
                        <option key={e.id} value={e.name}> {e.name} </option>
                    ))}
                </select>

                <select className='filter' defaultValue='Origin' onChange={(e) => handleFilterDate(e)}>
                    <option className='options' disabled> Origin</option>
                    <option className='options' value='All'> All origins </option>
                    <option className='options' value='created'> Created by user </option>
                    <option className='options' value='api'> From API </option>
                </select>

                <select className='filter' defaultValue='Order' onChange={(e) => handleSortName(e)}>
                    <option className='options' value='all'> Alphabetically </option>
                    <option className='options' value='asc'> A - Z </option>
                    <option className='options' value='desc'> Z - A </option>
                </select>

                <select className='filter' defaultValue='Rating' onChange={(e) => handleSortRanking(e)}>
                    <option className='options' value='all'> Rating </option>
                    <option className='options' value='high'> High - Low </option>
                    <option className='options' value='low'> Low - High </option>
                </select>

                <button className= 'reset' onClick={(e) => {handleClick(e)}}>
                    RESET
                </button>
            </div>

        </header>
    )
}