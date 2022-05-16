
import React from "react";
import loader from '../CSS/imagenes/loading.gif'
import '../CSS/9.Loading.css';
 
export default function Loading(){
    return(
        <div className='loader'>
            <img className="imagenLoading" src={ loader } width="100" height="100" alt="not tiene"/>
        </div>
    )
}