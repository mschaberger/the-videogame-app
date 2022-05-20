//siempre se define un estado inicial:
const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    platforms: [],
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
                //El método Array.from() crea una nueva instancia de Array a partir de un objeto iterable. 
                //El objeto Set permite almacenar valores únicos de cualquier tipo. Un valor en un Set sólo puede estar una vez.
            };

        case "GET_VIDEOGAME":
            return {
                ...state,
                videogames: action.payload,
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
                ? allVideogames2.filter((el) => el.fromDb === true)
                : allVideogames2.filter((el) => el.fromDb !== true);
            return {
                ...state,
                videogames:
                action.payload === "All" ? state.allVideogames : createdFilter,
            };
    
        case "ORDER_BY_NAME":
            if(action.payload === 'all') {
                return {
                    ...state,
                    videogames: [...state.videogames],
                    allVideogames: [...state.allVideogames]
                }
            }
            if(action.payload === 'desc') {
                return {
                    ...state,
                    videogames: [...state.videogames].sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)),
                }
            }
            else {
                return {
                    ...state,
                    videogames: [...state.videogames].sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
                }
            };
    
        case "ORDER_BY_RATING":
            if(action.payload === 'all') {
                return {
                    ...state,
                    videogames: [...state.videogames],
                    allVideogames: [...state.allVideogames]
                }
            }
            if (action.payload === "low") {
                return {
                    ...state,
                    videogames: [...state.videogames].sort((a, b) => {
                        if (a.rating > b.rating) return 1;
                        if (b.rating > a.rating) return -1;
                        else return 0;
                    })
                }
            }
            else {
                return {
                    ...state,
                    videogames: [...state.videogames].sort((a, b) => {
                        if (a.rating > b.rating) return -1;
                        if (b.rating > a.rating) return 1;
                        else return 0;
                    })
                }
            };

        default:
            return state;
    }
};


export default reducer;
