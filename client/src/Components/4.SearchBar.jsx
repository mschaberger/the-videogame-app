import React from 'react';
import { getVideogame } from '../Redux/actions/index.js';
import { connect } from 'react-redux';
import '../CSS/4.searchBar.css';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: ''
        }
    };

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            game: e.target.value
        });
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.game.trim()) {
            return alert("Please insert a videogame name");
        } else {
            await this.props.getVideogame(this.state.game);
            this.setState({
                game: ''
            })
            if (this.props.videogames.length === 0) {
                return alert("We do not have a game with that name, LET'S CREATE ONE!")
            }
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
                    onSubmit = {e => this.handleSubmit(e)}
                />
                <button
                    className='buttonSearch'
                    type='submit'
                    onClick = {e => this.handleSubmit(e)}
                > Search </button>
            </div>                    
        )
    }
};

export const mapStateToProps = (state) => {
    return{
        videogames: state.videogames
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getVideogame: videogame => dispatch(getVideogame(videogame))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);


/*
export default function SearchBar() {
    const dispatch = useDispatch(); 
    const [game, setGame] = useState(''); 

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
                onClick = {e => handleSubmit(e)}
            />

            <button
            className='buttonSearch'
            type='submit'
            onClick = {e => handleSubmit(e)}
            > SEARCH </button>
        </div>
    );
}
*/



