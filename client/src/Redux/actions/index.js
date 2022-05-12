//se definen todas las actions (filtrar, ordenar, pedir todos los vg, pedir detalles de un VG, postear un nuevo vg)
//cada action devuelve un objeto
//con promesas no necesito el async await:
import axios from "axios";

export function getAllVideogames() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: "GET_ALL_VIDEOGAMES", 
            payload: json.data 
        })
    }    
}

export function getVideogame(game) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/videogames?search=${game}`)
            return dispatch({ 
                    type: "GET_VIDEOGAME", 
                    payload: json.data 
            });
        } catch (error) {
            console.log(error);
            return dispatch({ 
                type: "GET_VIDEOGAME", 
                payload: []
        });
        }
    };
}

export function getVideogameDetail(id) {
    return (dispatch) => { 
        axios.get(`http://localhost:3001/videogame/${id}`)
        .then((game) => { 
            dispatch({
                type: "GET_VIDEOGAME_DETAIL", 
                payload: game.data
            });     
        })
        .catch((error) => console.log(error));
    };
}
  
export function getGenres() {
    return (dispatch) => {
        axios.get('http://localhost:3001/genres')
        .then((genres) => {
            dispatch({
                type: "GET_GENRES",
                payload: genres.data
            })
        })
        .catch((error) => console.log(error));
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

export function loading(payload) {
    return {
      type: "LOADING",
      payload,
    };
};
  
