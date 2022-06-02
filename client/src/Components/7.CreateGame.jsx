import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getAllVideogames } from "../Redux/actions/index.js";
import { Link } from "react-router-dom";
import { validate } from "./10.Errors.jsx";
import defaultImage from '../CSS/imagenes/Nuevojuego.webp';
import swal from 'sweetalert';
import "../CSS/7.createGame.css";

export default function CreateGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames);
    const platforms = useSelector((state) => state.platforms);

    const [input, setInput] = useState({ 
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
    });
    const [errors, setErrors] = useState(validate(input));


    function handleChange(e) {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
        setErrors(validate({...input, [e.target.name]: e.target.value}));
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
            swal({
                className: 'sweet-warning',
                text: "Your game needs a name!",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if ( videogames.find( (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim())) {
            swal({
                className: 'sweet-warning',
                text: `The name ${input.name} already exist, please choose another one!`,
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.description.trim() === "") {
            swal({
                className: 'sweet-warning',
                text: "Your name needs a description!",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.released.trim() === "") {
            swal({
                className: 'sweet-warning',
                text: "Please tell me the release date!",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.rating.trim() === "" || input.rating < 1 || input.rating > 5) {
            swal({
                className: 'sweet-warning',
                text: "OOPS! The rating must be between 1 and 5",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.genres.length === 0) {
            swal({
                className: 'sweet-warning',
                text: "Please select one or more genres for your game",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.platforms.length === 0) {
            swal({
                className: 'sweet-warning',
                text: "Please select one or more platforms for your game",
                icon: "error",
                button: {text:'OK',className:'sweet-button'},
            });
        } else if (input.image.trim() === '') {
            input.image = defaultImage
        }
        else {
            dispatch(postVideogame(input));
            swal({
                className: 'sweet-warning',
                title: 'CONGRATULATIONS!',
                text: "You created a new game!",
                button: {text:'OK',className:'sweet-button'},
            });
            setInput({ 
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
    <div className="fondoCreate">
        <div className="contenedorCreate">

            <div className="headerCreate">
                <h1 className="tituloCreate"> LET`S CREATE YOUR GAME! </h1>
                <div>
                    <Link to="/home">
                    <button className="botonHome">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> HOME
                    </button>
                    </Link>
                </div>
            </div>

            <form id="formulario" className="formulario" onSubmit={(e) => handleSubmit(e)}>

                <div className="item">
                    <label className="label"> Name: </label>
                    <input
                        className="inputCreate"
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                    />
                    <br></br>
                    {errors.name && ( <span className='error'>{errors.name}</span>)} 
                </div>

                <div className="item">
                    <label className="label">Released:</label>
                    <input
                        className="inputCreate"
                        type="date"
                        value={input.released}
                        name="released"
                        onChange={(e) => handleChange(e)}
                    />
                    <br></br>
                    {errors.released && ( <spantrue className='error'>{errors.released}</spantrue>)}
                </div>

                <div className="item">
                    <label className="label">Rating:</label>
                    <input
                        className="inputCreate"
                        type="number"
                        value={input.rating}
                        name="rating"
                        onChange={(e) => handleChange(e)}
                    />
                    <br></br>
                    {errors.rating && ( <spantrue className='error'>{errors.rating}</spantrue>)}
                </div>

                <div className="item">
                    <label className="label">Image:</label>
                    <input
                        className="inputCreate"
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="item">
                    <label className="label">Genres:</label>
                    <select className="inputCreate" defaultValue="Select" onChange={(e) => handleSelectGenres(e)} >
                        <option disabled>Select</option>
                        {genres?.map((e) => (<option className="select" value={e.name} key={e.id}> {e.name} </option>))}
                    </select>
                    <br></br>
                    {errors.genres && ( <spantrue className='error'>{errors.genres}</spantrue>)}

                    <ul className="ul">
                        <li className="listaGP">
                            {input.genres.map((e) => (
                                <div className="divGP" key={e}>
                                    {e + " "}
                                    <button className='buttonDelete' type="button" onClick={() => handleDeleteGenres(e)}> x </button>
                                </div>
                            ))}
                        </li>
                    </ul>
                </div>

                <div className="item">
                    <label className="label">Platforms:</label>
                    <select className="inputCreate" defaultValue="Select" onChange={(e) => handleSelectPlatforms(e)} >
                        <option disabled>Select</option>
                        {platforms?.map((e) => (<option className="select" value={e} key={e}> {e} </option>))}
                    </select>
                    <br></br>
                    {errors.platforms && ( <spantrue className='error'>{errors.platforms}</spantrue>)}

                    <ul className="ul">
                        {input.platforms.map((e) => (
                            <li key={e} className="listaGP">
                                <div className="divGP">
                                    {e + " "}
                                    <button className='buttonDelete' type="button" onClick={() => handleDeletePlatforms(e)}> x </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="item">
                    <label className="label">Description: </label>
                    <input
                        className="inputCreate"
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={(e) => handleChange(e)}
                    />
                    <br></br>
                    {errors.description && ( <spantrue className='error'>{errors.description}</spantrue>)}

                </div>

                <button data-text="Awesome" className="button">
                    <span className="actual-text">&nbsp;CREATE&nbsp;</span>
                    <span className="hover-text" aria-hidden="true">&nbsp;CREATE&nbsp;</span>
                </button>

            </form>
        </div>
    </div>
  );
}