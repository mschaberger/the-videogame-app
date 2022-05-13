//[ ] Alguna imagen de fondo representativa al proyecto
//[ ] Botón para ingresar al home (Ruta principal)

import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/1.landingPage.css';

export default function LandingPage() {
    return(
        <div className='landingPage'>
            <h1>Welcome GAME OVER</h1>
            <p>The ultimate Videogame library</p>
            <Link to ='/home'>
                <button className='buttonLandingP'>LET'S GO!</button>
            </Link>
        </div>
    )
};

