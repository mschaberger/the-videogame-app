import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from './3.NavBar.jsx';
import GameCard from './5.GameCard.jsx'
import Pages from './6.Pages.jsx';
import '../CSS/2.home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.allVideogames); //trae del state todo lo que esta en el array videogames
    const videogames = useSelector((state) => state.videogames); //trae del state todo lo que esta en el array videogame


    const [currentPage, setCurrentPage] = useState(1);
    const videogamesPerPage = 15;
    const indexOfLastVideogame = currentPage * videogamesPerPage; //  current (2) * 15 (games per page) = 30. entonces el last index is 30.
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //   30 (result de arriba) - 15 (games per page) = 15
    
    const paginado = function(pageN) {
      setCurrentPage(pageN);
    };

    useEffect(() => { //es como el componentDidMount del componente de clases
        setCurrentPage(1);
    }, [dispatch]); 

    const showCards = (videogames) => {
        const currentVideogames = videogames.slice(indexOfFirstVideogame,indexOfLastVideogame);
        return (
            <div>
                <div className="card_contenedor">
                    {currentVideogames.map((e) => {
                    return (
                        <div key={e.id}>
                            <Link to={"/home/" + e.id}>
                                <GameCard
                                    name={e.name}
                                    image={e.image}
                                    genres={e.genres}
                                    rating={e.rating}
                                />
                            </Link>
                        </div>
                    );
                    })}
                </div>
                    
                <Pages
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={videogames.length}
                    paginado={paginado}
                />
            </div>
        )
    };


    return(
        <div className='container'>

            <NavBar/>

            <div className='cardContainer'>
                {videogames.length > 0 ? showCards(videogames) : showCards(allVideogames)}
            </div>

        </div>
    )
};