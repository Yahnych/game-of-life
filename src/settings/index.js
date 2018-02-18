import React, { Component } from "react";
import Button from "../button";
import "./style.css";

export default class Settings extends Component {
    onClick() {
        const width = parseInt(document.getElementById("width").value, 10);
        const height = parseInt(document.getElementById("height").value, 10);
        this.props.callback(width, height);
    }
    onKeyDown(event) {
        if (!"0123456789".includes(event.key)) {
            event.preventDefault();
            return false;
        }
    }

    render() {
        return (
          <div className="settings-container">
              <div className="title">Enter size of game area</div>
              <div>
                  <label>Width:</label>
                  <input id="width" type="text" defaultValue="42" onKeyDown={this.onKeyDown}/>
              </div>
              <div>
                  <label>Height:</label>
                  <input id="height" type="text" defaultValue="42" onKeyDown={this.onKeyDown}/>
              </div>
              <Button onClick={() => this.onClick()} text="Start"/>
          </div>
        );
    }
}
