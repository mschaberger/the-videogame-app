//Debe mostrar: imagen - nombre - géneros - Descripción - Fecha de lanzamiento - Rating - Plataformas

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail, cleanDetail } from "../Redux/actions/index.js";
import { Link, useParams } from 'react-router-dom';
import '../CSS/8.gameDetail.css';


export default function GameDetail() {
    
    const dispatch = useDispatch();
    const { id } = useParams();
  
    useEffect(() => {
        dispatch(getVideogameDetail(id));
        return function () {
        dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    const theVideogame = useSelector((state) => state.detail);

    return(
        <div className='detailContainer'>
            <Link to= {`/home`} >
                <button className='home'> HOME </button>
            </Link>

            <div className="detailGame">
                <div className="infoGame">
                    <h2 className='game'> { theVideogame.name } </h2>
                    <h3 className='released'> Released: { theVideogame.released }</h3>
                    <p className='description'> { theVideogame.description } </p>
                    <h3 className='rating'> Rating: { theVideogame.rating } </h3>
                    <h3 className='genres'> Genres: { theVideogame.genres.map((genre) => genre.name).join(', ') } </h3>
                    <h3 className='platforms'> Platforms: { theVideogame.platforms }</h3>
                </div>
                <img className='image' src={ theVideogame.image } alt=''/>
            </div>
        </div>
    );
};

