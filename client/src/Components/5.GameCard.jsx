//cada VG Deberá mostrar su: Imagen - Nombre - Géneros
import React from 'react';
import '../CSS/5.gameCard.css';

export default function GameCard({ name, image, genres, rating, id }) {
    
    return(
        <div className='card'>
            <h2 className='gameCard'> { name } </h2>
            <img className='image' src={image} alt=''/>
            <h3 className='data'> { genres.join(', ') } </h3>
            <h3 className='data'> Rating: { rating } </h3>
        </div>
    );
};
