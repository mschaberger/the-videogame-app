import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogame } from '../Redux/actions/index.js';
import { connect } from 'react-redux';
import '../CSS/4.searchBar.css';


export default function SearchBar({onSearch}) {
    const dispatch = useDispatch(); //-----------> LO REEMPLAZA EL MAPDISPATCHTOPROPS
    const [game, setGame] = useState(''); //-----> LO REEMPLAZA THIS.STATE Y THIS.SETSTATE

    function handleInputChange(e) {
        e.preventDefault();
        setGame(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if (!game.trim()) {
            return alert("Please insert a videogame name");
        } else {
            dispatch(getVideogame(game));
            setGame("");
        }
    }

    return (
        <div>
            <input
                className='inputSearch'
                type="text"
                id = 'search'
                placeholder="Search a game..."
                value={game}
                onChange = {e => handleInputChange(e)}
            />

            <button
            className='buttonSearch'
            type='submit'
            onClick = {e => handleSubmit(e)}
            > SEARCH </button>
        </div>
    );
}

/*
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: ''
        }
    };

    handleInputChange(e) {
        e.preventDefault();
        this.setState({
            game: e.target.value
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.game.trim()) {
            return alert("Please insert a videogame name");
        } else {
            this.props.getVideogame(this.state.game);
            this.setState({
                game: ''
            })
        }
    };
    
    
    render() {
        const { game } = this.state;
        return(
            <div>
                <input
                    className='inputSearch'
                    type="text"
                    id = 'search'
                    placeholder="Search a game..."
                    value={game}
                    onChange = {e => this.handleInputChange(e)}
                />

                <button
                    className='buttonSearch'
                    type='submit'
                    onClick = {e => this.handleSubmit(e)}
                > Search </button>
            </div>
        )
    }
}

//REEMPLAZA AL USEDISPATCH:
function mapDispatchToProps(dispatch) {
    return {
        getVideogame: videogame => dispatch(getVideogame(videogame))
    }
};

export default connect(mapDispatchToProps)(SearchBar);
*/