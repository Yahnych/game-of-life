import React, { Component } from "react";
import "./style.css";

export default class Brick extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.alive !== this.props.alive;
    }

    render() {
        let style = {
            backgroundColor: "rgb(150, 255, 150)",
        };
        if (!this.props.alive) style.backgroundColor = "rgb(200, 200, 200)";

        return (
            <div className="brick" style={style} onClick={() => this.props.onClick(this.props.index)}>
            </div>
        );
    }
}
