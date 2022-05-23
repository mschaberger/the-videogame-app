//cada VG Deberá mostrar su: Imagen - Nombre - Géneros
import React from 'react';
import '../CSS/5.gameCard.css';

/* 
export default function GameCard({ name, image, genres, rating }) {
    
    return(
        <div className='cardSingle'>
            <img className='imageCard' src={image} alt=''/>
            <h2 className='gameName'> { name } </h2>
            <h3 className='ratingCard'> Rating: { rating } </h3>
            <h3 className='dataCard'> { genres.join(', ') } </h3>
        </div>
    );
}; 
*/


export default class GameCard extends React.Component {
    render() {
        return (
            <div className='cardSingle'>
                <img className='imageCard' src={ this.props.image } alt=''/>
                <h2 className='gameName'> { this.props.name } </h2>
                <h3 className='ratingCard'> Rating: { this.props.rating } ☆ </h3>
                <h3 className='dataCard'> { this.props.genres.join(', ') } </h3>
            </div>
        )
    }
};