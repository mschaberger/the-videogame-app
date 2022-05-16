import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogame } from '../Redux/actions/index.js';
import Loading from './9.Loading.jsx';
import '../CSS/4.searchBar.css';

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch();
    const [game, setGame] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setGame(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if (!game.trim()) {
            return alert("Please insert a videogame name");
        } else {
            dispatch(getVideogame(game));
            setGame("");
        }
    }

    return (
        <div>
            <input
                className='input'
                type="text"
                id = 'search'
                placeholder="Search a game..."
                value={game}
                onChange = {e => handleInputChange(e)}
            />

            <button
            className='buttonSearch'
            type='submit'
            onClick = {e => handleSubmit(e)}
            > Search </button>
        </div>
    );
}