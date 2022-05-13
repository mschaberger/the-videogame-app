import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames, getGenres, filterByGenres, filterByDate, orderByName, orderByRating, loading } from '../Redux/actions/index.js';
import { Link } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import GameCard from './GameCard.jsx'
import Pages from './Pages.jsx';
import '../CSS/home.css';
import gif from '../CSS/loading.gif'

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    const load = useSelector((state) => state.loading)


    const [setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; //  current (2) * 15 (games per page) = 30. entonces el last index is 30.
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //   30 (result de arriba) - 15 (games per page) = 15
  
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame);
  
    const paging = (pageN) => {
      setCurrentPage(pageN);
    };

    useEffect(() => {
        dispatch(loading(true));
        dispatch(getGenres());
        dispatch(getAllVideogames());
    }, []) //vacio porque necesitamos que se ejecute cada vez que se monta

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
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    function handleSortRanking(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }
    //para volver al inicio y sacar los filtros/orden
    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllVideogames);
    }

    //if (load) {
      //  return (
        //    <div>
          //      <img src={gif} className="loading" alt="loading please wait" />
            //</div>
        //);
   // }

    return(
        <div className='container'>
            <NavBar/>

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

                <select className='sort' defaultValue='Order' onChange={(e) => handleSortName(e)}>
                    <option className='options' disabled> Order </option>
                    <option className='options' value='asc'> A - Z </option>
                    <option className='options' value='desc'> Z - A by user </option>
                </select>

                <select className='sort' defaultValue='Rating' onChange={(e) => handleSortRanking(e)}>
                    <option className='options' disabled> Rating </option>
                    <option className='options' value='high'> High - Low </option>
                    <option className='options' value='low'> Low - High </option>
                </select>

                <button onClick={(e) => {handleClick(e)}}>
                    RESET
                </button>
            </div>

            <div className="card_contenedor">
                {currentVideogames.map((e) => {
                return (
                    <div key={e.id}>
                        <Link to={"/home/" + e.id}>
                            <GameCard
                                name={e.name}
                                image={e.image}
                                genres={e.genres}
                                rating={e.rating}
                            />
                        </Link>
                    </div>
                );
                })}
            </div>

            <Pages
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paging}
                currentPage={currentPage}
            />
        </div>
    )
}