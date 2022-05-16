import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getAllVideogames } from "../Redux/actions/index.js";
import { Link } from "react-router-dom";
import "../CSS/7.createGame.css";

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames);
    const platforms = useSelector((state) => state.platforms);

    const [input, setInput] = useState({ //estado inicial:
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
    });

    function handleChange(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };

    function handleSelectGenres(e) {
        setInput({
        ...input,
        genres: input.genres.includes(e.target.value)
            ? input.genres
            : [...input.genres, e.target.value],
        });
    };

    function handleSelectPlatforms(e) {
        setInput({
        ...input,
        platforms: input.platforms.includes(e.target.value)
            ? input.platforms
            : [...input.platforms, e.target.value],
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.name.trim()) {
            return alert("ERROR: Your game needs a name!");
        } else if ( videogames.find( (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim())) {
            return alert(`SAD: The name ${input.name} already exist, please choose another one!`);
        } else if (input.description.trim() === "") {
            return alert("ERROR: Your name needs a description!");
        } else if (input.released.trim() === "") {
            return alert("ERROR: Please tell me the release date!");
        } else if (input.rating.trim() === "" || input.rating < 1 || input.rating > 5) {
            return alert("OOPS! The rating must be between 1 and 5");
        } else if (input.genres.length === 0) {
            return alert("Please select one or more genres for your game");
        } else if (input.platforms.length === 0) {
            return alert("Please select one or more platforms for your game");
        } 
        else {
            dispatch(postVideogame(input));
            alert("CONGRATULATIONS! You created a new game!");
            setInput({ //setea todo en cero de nuevo:
                name: "",
                image: "",
                description: "",
                released: "",
                rating: "",
                genres: [],
                platforms: [],
            });
            document.getElementById("formulario").reset();
            window.location.reload();
        }
    };

    function handleDeleteGenres(e) {
        setInput({
        ...input,
        genres: input.genres.filter((el) => el !== e),
        });
    };

    function handleDeletePlatforms(e) {
        setInput({
        ...input,
        platforms: input.platforms.filter((el) => el !== e),
        });
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getAllVideogames());
    }, [dispatch]);

  return (
    <div className="fondo">
        <div className="contenedorCreate">

            <div className="top">
                <h1 className="tituloCreate"> LET`S CREATE YOUR GAME! </h1>
                <div>
                    <Link to="/home">
                        <button className="botonHome"> HOME </button>
                    </Link>
                </div>
            </div>

            <form id="formulario" className="formulario" onSubmit={(e) => handleSubmit(e)}>

                <div className="item">
                    <label className="label"> Name: </label>
                    <input
                        className="input"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="item">
                    <label className="label">Released:</label>
                    <input
                        className="input"
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="item">
                    <label className="label">Rating:</label>
                    <input
                        className="input"
                        type="number"
                        value={input.rating}
                        name="rating"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="item">
                    <label className="label">Image:</label>
                    <input
                        className="input"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="item">
                    <label className="label">Genres:</label>
                    <select className="input" defaultValue="Select" onChange={(e) => handleSelectGenres(e)} >
                        <option disabled>Select</option>
                        {genres?.map((e) => (<option className="select" value={e.name} key={e.id}> {e.name} </option>))}
                    </select>

                    <ul className="ul">
                        <li className="listaGP">
                            {input.genres.map((e) => (
                                <div className="divGP" key={e}>
                                    {e + " "}
                                    <button className='buttonDelete' type="button" onClick={() => handleDeleteGenres(e)}> X </button>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>

                <div className="item">
                    <label className="label">Platforms:</label>
                    <select className="input" defaultValue="Select" onChange={(e) => handleSelectPlatforms(e)} >
                        <option disabled>Select</option>
                        {platforms?.map((e) => (<option className="select" value={e} key={e}> {e} </option>))}
                    </select>

                    <ul className="ul">
                        {input.platforms.map((e) => (
                            <li key={e} className="listaGP">
                                <div className="divGP">
                                    {e + " "}
                                    <button className='buttonDelete' type="button" onClick={() => handleDeletePlatforms(e)}> X </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="item">
                    <label className="label">Description: </label>
                    <input
                        className="input"
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div>
                    <button className="botonCreateVideogame" type="submit"> CREATE </button>
                </div>

            </form>
        </div>
    </div>
  );
}