import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import NavBar from './3.NavBar.jsx';
import GameCard from './5.GameCard.jsx'
import Pages from './6.Pages.jsx';
import Loading from './9.Loading.jsx';
import '../CSS/2.home.css';

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.allVideogames); 
    const videogames = useSelector((state) => state.videogames); 

    //Paginado, numeración y prev-next
    const [currentPage, setCurrentPage] = useState(1);
    const videogamesPerPage = 15;
    const indexOfLastVideogame = currentPage * videogamesPerPage; 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; 
    
    const paginado = function(pageN) {
      setCurrentPage(pageN);
    };

    useEffect(() => { 
        setCurrentPage(1);
    }, [dispatch]); 

    const handleNext = () => {
        const totalVideogames = videogames.length;
        const nextPage = currentPage + 1;
        console.log(totalVideogames)
        console.log(indexOfLastVideogame)
        if (indexOfLastVideogame >= totalVideogames) {
            swal({
                className: 'sweet-warning',
                title: 'OOPS this is the last page!',
                icon: "warning",
                button: {text:'OK',className:'sweet-button'},
            });
        }
        setCurrentPage(nextPage);
    }

    const handlePrev = () => {
        const prevPage = currentPage - 1;
        if (prevPage <= 0) {
            swal({
                className: 'sweet-warning',
                title: 'OOPS this is the first page!',
                icon: "warning",
                button: {text:'OK',className:'sweet-button'},
            });
        }
        setCurrentPage(prevPage);
    }

    
    //Relaciono la renderización de las cards con el paginado:
    const showCards = (videogames) => {
        const currentVideogames = videogames.slice(indexOfFirstVideogame,indexOfLastVideogame);
        return (
            <div>
                <div className="card_contenedor">
                    {currentVideogames.length === 0 && currentVideogames ? (
                        <Loading />
                    ) : (
                    currentVideogames.map((e) => {
                    return (
                        <div className='noLink' key={e.id}>
                            <Link to={"/home/" + e.id} className='noLink'>
                                <GameCard
                                    name={e.name}
                                    image={e.image}
                                    genres={e.genres}
                                    rating={e.rating}
                                />
                            </Link>
                        </div>
                    );
                    }))}
                </div>

                <div className='renderPages'>    
                    <button className='btnPages' onClick={e => handlePrev(e)}> ◄ </button>    
                    <Pages
                        videogamesPerPage = {videogamesPerPage}
                        allVideogames = {videogames.length}
                        paginado = {paginado}
                    />
                    <button className='btnPages' onClick={e => handleNext(e)}> ► </button>
                </div>
            </div>
        )
    };


    return(
        <div className='containerHome'>

            <div className='navBarHome'>
                <NavBar/>
            </div>

            <div className='card_contenedor'>
                {videogames.length > 0 ? showCards(videogames) : showCards(allVideogames)}
            </div>

        </div>
    )
};