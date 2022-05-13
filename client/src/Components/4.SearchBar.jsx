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
        if (game.length > 1) {
            dispatch(getVideogame(game));
            setGame('')
        } else {
            dispatch(getAllVideogames());
        }
    }

    return (
        <div>
            <input
                className='input'
                type="text"
                placeholder="Search a game..."
                value={game}
                onChange={e => handleInputChange(e)}
            />
        </div>
    );
}