//se definen todas las actions (filtrar, ordenar, pedir todos los vg, pedir detalles de un VG, postear un nuevo vg)
//cada action devuelve un objeto
//con promesas no necesito el async await:
import axios from "axios";

export function getAllVideogames() {
    return async function(dispatch) {
        return await fetch(`http://localhost:3001/videogames`)
            .then(response => response.json())
            .then(data => {
                dispatch({ 
                    type: "GET_ALL_VIDEOGAMES", 
                    payload: data 
                });
            });
    };
}

export function getVideogame(game) {
    return async function(dispatch) {
        await fetch(`http://localhost:3001/videogames?search=${game}`)
        .then(response => response.json())
        .then(data => {
            dispatch({ 
                type: "GET_VIDEOGAME", 
                payload: data 
            });
        });
    };
}

export function getVideogameDetail(id) {
    return async function(dispatch) { 
        await fetch (`http://localhost:3001/videogame/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: "GET_VIDEOGAME_DETAIL", 
                payload: data
            });     
        })
    };
}
  
export function getGenres() {
    return async function(dispatch) {
        return await fetch ('http://localhost:3001/genres')
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: "GET_GENRES",
                payload: data
            })
        })
    };
}
  
export function postVideogame(payload) {
    return async function() {
        try {
            const response = await axios.post("http://localhost:3001/videogame", payload);
        return response;
        } catch (error) {
            console.log(error);
        }
    };
}

export function filterByGenres(genre) {
    return {
        type: "FILTER_BY_GENRES",
        payload: genre
    };
}
  
export function filterByDate(date) {
    return {
        type: "FILTER_BY_DATE",
        payload: date
    };
}
  
export function orderByName(option) {
    return {
        type: "ORDER_BY_NAME",
        payload: option
    };
}
  
export function orderByRating(option) {
    return {
        type: "ORDER_BY_RATING",
        payload: option
    };
}

export function userName(user) {
    return {
        type: "USER_NAME",
        payload: user,
    };
};

export function getClean() {
    return {
        type: "GET_CLEAN",
    };
};
  
