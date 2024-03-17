import React, { useContext } from "react";
import "../styles/GameOfLife.css";
import Grid from "../components/Grid";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function GameOfLife() {
  return (
    <div>
      <h1>Game of Life</h1>
      <div className="conditions">
        <input type="text" id="height" placeholder="Height"></input>
        <input type="text" id="width" placeholder="Width"></input>
        <button id="submit">Submit</button>
      </div>

      <Grid />
    </div>
  );
}
