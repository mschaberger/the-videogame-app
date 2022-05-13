//siempre se define un estado inicial:
const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    nameUser: [],
    platforms: [],
    loading: false
};

//se crea una funcion reducer con un switch para recorrer todas las actions hasta que encuentra la solicitada y la ejecuta
function reducer(state = initialState, action) {
    switch (action.type) {
        
        case "GET_ALL_VIDEOGAMES":
            let platforms = [];
            action.payload.forEach((game) => {
                platforms = [...platforms, ...game.platforms]
            });
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                platforms: Array.from(new Set(platforms)),
                loading: false,
            };

        case "GET_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload,
                loading: true
            };

        case "GET_VIDEOGAME_DETAIL":
            return {
                ...state,
                detail: action.payload,
            }; 
        
        case "CLEAN_DETAIL":
            return {
                ...state,
                detail: [],
            };
      
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload,
            };
      
        case "POST_VIDEOGAME":
            return {
              ...state,
            };
      
        case "FILTER_BY_GENRES":
            const allVideogames = state.allVideogames;
            const genresFiltered =
                action.payload === "All"
                ? allVideogames
                : allVideogames.filter((e) => e.genres.includes(action.payload));
            return {
                ...state,
                videogames: genresFiltered,
            };
    
        case "FILTER_BY_DATE":
            const allVideogames2 = state.allVideogames;
            const createdFilter =
                action.payload === "created"
                ? allVideogames2.filter((el) => el.createdInDb === true)
                : allVideogames2.filter((el) => el.createdInDb !== true);
            return {
                ...state,
                videogames:
                action.payload === "All" ? state.allVideogames : createdFilter,
            };
    
        case "ORDER_BY_NAME":
            const sortedArrName =
                action.payload === "asc"
                ? state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                    })
                : state.videogames.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                    });
            return {
                ...state,
                videogames: sortedArrName,
            };
    
        case "ORDER_BY_RATING":
            const sortedArrRating =
                action.payload === "low"
                ? state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                    })
                : state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1;
                    }
                    return 0;
                    });
            return {
                ...state,
                videogames: sortedArrRating,
            };
            
        case "USER_NAME":
            return {
                ...state,
                nameUser: action.payload,
            };
        
        case "LOADING":
            return {
                ...state,
                loading: action.payload,
            };

        default:
            return state;
    }
};


export default reducer;
