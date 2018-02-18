import React, { Component } from "react";
import Brick from "./brick";
import Button from "../button"
import "./style.css";

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.state = {
            started: false,
            board: [],
        }
        for (let i = 0; i < props.width * props.height; i++)
            this.state.board.push(false);
    }

    update() {
        const adjacent = (coord, size, callback) => {
            for (let i = coord - 1; i <= coord + 1; i++) {
                let c = i;
                if (c < 0) c = size - 1;
                if (c > size - 1) c = 0;
                callback(c);
            }
        };
        const adjacentLiving = (index) => {
            let living = 0;
            const x = index % this.props.width | 0;
            const y = index / this.props.width | 0;
            adjacent(x, this.props.width, (xx) => {
                adjacent(y, this.props.height, (yy) => {
                    const id = xx + this.props.width * yy;
                    if (id !== index && this.state.board[id]) living++;
                })
            });
            return living;
        };

        this.timer = null;
        const board = [];
        for (let i = 0; i < this.props.width * this.props.height; i++) {
            const countLiving = adjacentLiving(i);
            if (countLiving === 3) board.push(true);
            else if (countLiving === 2) board.push(this.state.board[i]);
            else board.push(false);
        }
        this.setState({ board });
    }

    onBtnClick() {
        this.setState({
            started: !this.state.started,
        });
    }

    onClearClick() {
        const board = this.state.board.map(() => false);
        this.setState({
            started: false,
            board
        });
        this.timer = null;
    }

    componentDidUpdate() {
        if (this.state.started && !this.timer)
            this.timer = setTimeout(() => this.update(), 16);
    }

    render() {
        const createRow = (index) => {
            const row = [];
            for (let i = 0; i < this.props.width; i++) {
                const id = i + index * this.props.width;
                row.push(<Brick key={id} index={id} alive={this.state.board[id]} onClick={
                    (index) => {
                        // я хз, как здесь сделать правильно, поэтому так
                        const board = this.state.board;
                        board[index] = !board[index];
                        this.setState({ board });
                    }
                }/>);
            }
            return row;
        };

        const game = [];
        for (let i = 0; i < this.props.height; i++)
            game.push((
                <div className="board-row" key={i}>
                    {createRow(i)}
                </div>
            ));

        return (
            <div className="board">
                {game}
                <Button onClick={() => this.onBtnClick()} text={this.state.started ? "Stop" : "Start"}/>
                <Button onClick={() => this.onClearClick()} text="Clear"/>
            </div>
        );
    }
}
