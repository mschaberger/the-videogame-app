import React from "react";
import '../CSS/9.Loading.css';
 

export default class Loading extends React.Component{
    render() {
        return(
            <div className = "spinner">
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </div>
        )
    }
};
