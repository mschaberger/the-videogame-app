import React from 'react';
import { getVideogame } from '../Redux/actions/index.js';
import { connect } from 'react-redux';
import swal from 'sweetalert';
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
            swal({
                className: 'sweet-warning',
                text: "Please insert a videogame name",
                icon: "error",
                button: "OK",
            });
        } else {
            await this.props.getVideogame(this.state.game.trim());
            this.setState({
                game: ''
            })
            if (this.props.videogames.length === 0) {
                swal({
                    className: 'sweet-warning',
                    title: "We do not have a game with that name, LET'S CREATE ONE!",
                    icon: "error",
                    button: {text:'OK',className:'sweet-button'},
                });
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




