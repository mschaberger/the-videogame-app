//[ ] Alguna imagen de fondo representativa al proyecto
//[ ] Botón para ingresar al home (Ruta principal)

import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/landingPage.css';

export default function LandingPage() {
    return(
        <div className='landingPage'>
            <h1>Welcome to the gamers paradise</h1>

            <Link to ='/home'>
                <button className='button'>LET'S GO!</button>
            </Link>
        </div>
    )
};

