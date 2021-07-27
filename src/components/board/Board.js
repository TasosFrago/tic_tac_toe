import React, { Component } from 'react';
import { TurnContext } from '../TurnContext';
import xImage from './ximg.jpg';
import oImage from './oimg.jpg';
import placeHolder from './placeholder.png';

import './Board.css'


function player() {
    let num = Math.floor(Math.random() * 2);
    let value = (num === 1)? "x": "o";
    return value;
}

function calculateWinner(config) {
    let res;
    const combinations = [
        ["A1", "A2", "A3"],
        ["B1", "B2", "B3"],
        ["C1", "C2", "C3"],
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"],
        ["A1", "B2", "C3"],
        ["A3", "B2", "C1"],
    ];

    for (let i = 0; i < combinations.length; i++) {
        const [a, b, c] = combinations[i];
        if (config[a] === "x" && config[b] === "x" && config[c] === "x"){
            res = "xWin";
        } else if (config[a] === "o" && config[b] === "o" && config[c] === "o") {
            res = "oWin";
        }
    }
    return res;
}

class Board extends Component {
    static contextType = TurnContext;
    
    constructor(props) {
        super(props);
        this.state = {disabled: false, msg: null};
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.context[0].player = player();
        this.forceUpdate();
    }

    handleClick(e) {
        let lastTurnIndex = this.context.length - 1;
        let lastTurn = this.context[lastTurnIndex];
        
        lastTurn.turnNumber += 1;
        
        if (lastTurn.player === "x") {
            e.currentTarget.disabled = true;
            e.target.src = xImage;
            lastTurn[e.currentTarget.id] = "x";
        } else if (lastTurn.player === "o") {
            e.currentTarget.disabled = true;
            e.target.src = oImage;
            lastTurn[e.currentTarget.id] = "o";
        }
        lastTurn.player = (lastTurn.player === "x")? "o": "x";
        this.context.push(lastTurn);
        
        let winner = calculateWinner(lastTurn);
        if (winner === "xWin") {
            this.setState({disabled: true, msg: "X player won!!!"});
        } else if (winner === "oWin") {
            this.setState({disabled: true, msg: "O player won!!!"});
        }
        this.forceUpdate();
    }
    
    render() {
        let turn = this.context[this.context.length - 1];
        return(
            <div>
            <h1>Round: {turn.turnNumber}</h1>
            <h2>Player: {turn.player}</h2>
            <h1>{this.state.msg}</h1>
            <div className="gameBoard">
                <button id="A1" type="button" value={turn.A1} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="A2" type="button" value={turn.A2} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="A3" type="button" value={turn.A3} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
            
                <button id="B1" type="button" value={turn.B1} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="B2" type="button" value={turn.B2} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="B3" type="button" value={turn.B3} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
            
                <button id="C1" type="button" value={turn.C1} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="C2" type="button" value={turn.C2} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
                <button id="C3" type="button" value={turn.C3} onClick={this.handleClick} disabled={this.state.disabled}><img src={placeHolder} alt=""></img></button>
            </div>
            </div>
        );
    }
}

export default Board;
