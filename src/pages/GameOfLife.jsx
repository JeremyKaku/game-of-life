import React, { useContext, useState, useEffect } from "react";
import "../styles/GameOfLife.css";
import Grid from "../components/Grid";
import { GameContext } from "../context/GameContextProvider";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function GameOfLife() {
  const [isRunning, setIsRunning] = useState(true);
  const { contextValue } = useContext(GameContext);
  const cellState = contextValue.cellState;
  const setCellState = contextValue.setCellState;
  const INTERVAL_MS = 1000;

  function countNeighbors(cellGrid, row, col) {
    let count = 0;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < cellGrid.length &&
        newCol >= 0 &&
        newCol < cellGrid[newRow].length
      ) {
        if (cellGrid[newRow][newCol].status) {
          count++;
        }
      }
    }
    return count;
  }

  function generateNextGeneration() {
    let newCellState = { ...cellState };
    for (let i = 0; i < newCellState.cellGrid.length; i++) {
      for (let j = 0; j < newCellState.cellGrid[i].length; j++) {
        const neighbors = countNeighbors(newCellState.cellGrid, i, j);
        if (newCellState.cellGrid[i][j].status) {
          if (neighbors < 2 || neighbors > 3) {
            newCellState.cellGrid[i][j].status = false;
          }
        } else {
          if (neighbors === 3) {
            newCellState.cellGrid[i][j].status = true;
            newCellState.cellGrid[i][j].lastAlive =
              newCellState.cellGrid[i][j].lastAlive + 1;
          }
        }
      }
    }
    setCellState(newCellState);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      generateNextGeneration();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Game of Life</h1>
      <div className="msg"></div>
      <div className="condition">
        <input type="text" id="height" placeholder="Height"></input>
        <input type="text" id="width" placeholder="Width"></input>
        <button id="submit">Submit</button>
      </div>

      <Grid />
      <div className="bottom">
        <button id="reset">Reset</button>
        <button id="singal">Next Step</button>
      </div>
    </div>
  );
}
