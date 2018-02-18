import React, { Component } from "react";
import "./App.css";
import Settings from "./settings";
import Game from "./game";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    render() {
        const content = this.state.width && this.state.height ?
            <Game width={this.state.width} height={this.state.height}/> :
            <Settings callback={(width, height) => this.setState({width, height})}/>;
          
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Game of <s>Thrones</s> Life</h1>
                </header>
                {content}
            </div>
        );
    }
}
