//[ ] Alguna imagen de fondo representativa al proyecto
//[ ] Botón para ingresar al home (Ruta principal)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userName } from '../Redux/actions/index.js';
import { useDispatch } from 'react-redux';
import '../CSS/landingPage.css';

export default function LandingPage() {

    const [userName, setUserName] = useState('');
    const dispacth = useDispatch();
  
    const handleChange = ({ target }) => {
        setUserName(target.value);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        dispacth(userName(userName));
    };

    return(
        <div className='landingPage'>
            <h1>Welcome to the gamers paradise</h1>

            <div className='user'>
                <label htmlFor=""> What's your name? </label>
                <input
                    className='input'
                    type="text"
                    value={userName}
                    onChange={handleChange}
                />
            </div>

            <Link to ='/home'>
                <button onClick={handleSubmit} className='button'>LET'S GO!</button>
            </Link>
        </div>
    )
};

