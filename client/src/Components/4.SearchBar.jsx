import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogame, getAllVideogames } from '../Redux/actions/index.js';
import '../CSS/4.searchBar.css';

export default function SearchBar({onSearch}) {
    const dispatch = useDispatch();
    const [game, setGame] = useState('');

    useEffect(() => {
      dispatch(getAllVideogames());
    }, [dispatch]);

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