import axios from "axios";

export function getAllVideogames() {
    return async function (dispatch) {
        try {
            const json = await axios.get("/videogames");
            return dispatch({
                type: "GET_ALL_VIDEOGAMES", 
                payload: json.data 
            })
        } catch (error) {
            console.log(error);
        }
    }    
};

export function getVideogame(game) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`/videogames?search=${game}`)
            return dispatch({ 
                    type: "GET_VIDEOGAME", 
                    payload: json.data 
            });
        } catch (error) {
            return dispatch({ 
                type: "GET_VIDEOGAME", 
                payload: []
            });
        }
    };
};

export function getVideogameDetail(id) {
    return (dispatch) => { 
        axios.get(`/videogame/${id}`)
        .then((game) => { 
            dispatch({
                type: "GET_VIDEOGAME_DETAIL", 
                payload: game.data
            });     
        })
        .catch((error) => console.log(error));
    };
}

export function cleanDetail() {
    return {
        type: "CLEAN_DETAIL",
    };
};

export function getGenres() {
    return (dispatch) => {
        axios.get('/genres')
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
            const response = await axios.post("/videogame", payload);
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
    }
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

  
