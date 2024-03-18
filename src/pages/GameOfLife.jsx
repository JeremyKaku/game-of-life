import { useContext, useState, useEffect } from "react";
import "../styles/GameOfLife.css";
import Grid from "../components/Grid";
import { GameContext } from "../context/GameContextProvider";

export default function GameOfLife() {
  const [isRunning, setIsRunning] = useState(false);
  const { contextValue } = useContext(GameContext);
  const cellState = contextValue.cellState;
  const setCellState = contextValue.setCellState;
  const INTERVAL_MS = 100;
  const [inputRows, setInputRows] = useState("");
  const [inputCols, setInputCols] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //Count the cell's neighbors
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

  //Generate the next generation of cells
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
    newCellState.aliveCount = newCellState.cellGrid
      .flat()
      .filter((cell) => cell.status).length;
    setCellState(newCellState);
  }

  //Auto play
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        generateNextGeneration();
      }, INTERVAL_MS);
    }

    return () => clearInterval(intervalId);
  }, [cellState, isRunning]);

  //Reset the grid
  function handleReset() {
    contextValue.resetGrid(20, 20);
    setIsRunning(false);
    setInputCols("");
    setInputRows("");
    setErrorMsg("");
  }

  //Single step
  function handleSingleStep() {
    setIsRunning(false);
    generateNextGeneration();
  }

  //Handle the input for the height
  function handleInputRowsChange(e) {
    let value = e.target.value.replace(/[^\d]/g, "").replace(/^0+/, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setInputRows(value);
  }

  //Handle the input for the width
  function handleInputColsChange(e) {
    let value = e.target.value.replace(/[^\d]/g, "").replace(/^0+/, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setInputCols(value);
  }

  //Handle the submit button
  function handleSubmit() {
    setErrorMsg("");
    setIsRunning(false);
    if (inputRows === "") {
      setErrorMsg("Please enter a value for Height!");
      return;
    }

    if (inputCols === "") {
      setErrorMsg("Please enter a value for Width!");
      return;
    }

    if (inputRows < 3 || inputRows > 40) {
      setErrorMsg("Height must be between 3 and 40!");
      return;
    }
    if (inputCols < 3 || inputCols > 40) {
      setErrorMsg("Width must be between 3 and 40!");
      return;
    }

    contextValue.resetGrid(inputRows, inputCols);
  }

  //Handle the auto play button
  function handleAutoPlay() {
    setIsRunning(!isRunning);
  }

  return (
    <div>
      <h1>Game of Life</h1>

      <div>
        <div className="error">{errorMsg}</div>
        <input
          type="text"
          id="height"
          className="input"
          placeholder="Height"
          onChange={handleInputRowsChange}
          value={inputRows}
        ></input>
        <input
          type="text"
          id="width"
          className="input"
          placeholder="Width"
          onChange={handleInputColsChange}
          value={inputCols}
        ></input>
        <button id="submit" className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <h3>Alive Count: {cellState.aliveCount}</h3>

      <Grid />
      <div>
        <button id="reset" className="button" onClick={handleReset}>
          Reset
        </button>
        <button id="singal" className="button" onClick={handleSingleStep}>
          Next Step
        </button>
        <button id="auto-play" className="button" onClick={handleAutoPlay}>
          Auto Play
        </button>
      </div>
    </div>
  );
}
