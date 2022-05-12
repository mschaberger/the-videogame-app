//VA SOLO el Input para buscar videojuegos por nombre, se renderiza en el navbar

import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogame } from '../actions';

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch();
    const [game, setGame] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setGame(e.target.value);
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        if (!game) {
            return alert('Please insert a Videogame')
        } else {
            dispatch(getVideogame(game));
            setGame('')
        }
    }

    return (
        <div>
            <input
                className='input'
                type="text"
                placeholder="Videogame..."
                value={game}
                onChange={e => handleInputChange(e)}
            />
            <button
                className = 'button'
                type = 'submit'
                onClick={(e) => handleOnSubmit(e)}>
                SEARCH
            </button>
        </div>
    );
}