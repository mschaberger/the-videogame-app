import React from 'react';
import '../CSS/6.pages.css';


export default function Pages({ videogamesPerPage, allVideogames, paginado }) {
    
    const pageN = [];

    for (let i = 0; i < Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageN.push(i+1);
    }

    return (
        <div>
            <ul className="ul">
                {pageN.length > 1 && pageN.map((number) => {
                    return (
                        <li className="pages" key={number}>
                            <button className='pageButton' onClick={() => paginado(number)} >
                                {number} 
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}