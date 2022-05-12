// VA SOLO EL Paginado con 15 juegos por pagina, mostrando los primeros 15 en la primer pagina, se renderiza en el navbar

import React from 'react';


export default function Pages({ videogamesPerPage, allVideogames, paging, currentPage }) {
    const pageN = [];
    const gamesInPage = Math.ceil(allVideogames / videogamesPerPage);

    for (let i = 0; i < gamesInPage; i++) {
        pageN.push(i + 1);
    }

    return (
        <nav>
            <ul className="ul">
                {pageN?.map((number) => (
                <li className="paginado" key={number}>
                    <button 
                        className={`botonPaginado ${currentPage === number ? "current-page" : ""}`}
                        onClick={() => paging(number)} >
                        {number}
                    </button>
                </li>
                ))}
            </ul>
        </nav>
    );
}