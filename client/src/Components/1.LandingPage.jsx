//[ ] Alguna imagen de fondo representativa al proyecto
//[ ] Botón para ingresar al home (Ruta principal)

import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/1.landingPage.css';
import go from '../CSS/imagenes/pressStart.gif'

export default function LandingPage() {
    return(
        <div className='landingPage'>
            <p className='landingTitle'> WELCOME </p>
            <Link to= '/home' className='buttonLandingP'>
                    <img src={go} alt="" />
            </Link>
        </div>
    )
};

