import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import '../CSS/navBar.css';

export default function NavBar() {
    return (
        <header  className='header'>

            <nav className='nav'>
                <SearchBar/>

                <Link to = '/videogame'>
                    <button>Create your videogame</button>
                </Link>
            </nav>

        </header>
    )
}