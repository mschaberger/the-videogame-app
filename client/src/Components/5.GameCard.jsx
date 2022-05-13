//cada VG Deberá mostrar su: Imagen - Nombre - Géneros
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/5.gameCard.css';

export default function GameCard({ name, image, genres, rating, id }) {
    
    return(
        <div className='card'>
            <Link to= {`/home/${id}`} >
                <h2 className='game'> { name } </h2>
                <img className='image' src={image} alt=''/>
            </Link>
            <h3 className='genres'> { genres.join(', ') } </h3>
            <h3 className='rating'> Rating: { rating } </h3>
        </div>
    );
};
