//cada VG Deberá mostrar su: Imagen - Nombre - Géneros
import React from 'react';
import '../CSS/5.gameCard.css';

export default function GameCard({ name, image, genres, rating, id }) {
    
    return(
        <div className='cardSingle'>
            <img className='imageCard' src={image} alt=''/>
            <h2 className='gameName'> { name } </h2>
            <h3 className='ratingCard'> Rating: { rating } </h3>
            <div className='dataContainer'>
                <h3 className='dataCard'> { genres.join(', ') } </h3>
            </div>
        </div>
    );
};
