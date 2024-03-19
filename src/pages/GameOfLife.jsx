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
  const [isLongerLasting, setIsLongerLasting] = useState(false);
  const [auto, setAuto] = useState("button");
  const [longer, setLonger] = useState("button longer-lasting");
  const [isInputRowErr, setIsInputRowErr] = useState(false);
  const [isInputColErr, setIsInputColErr] = useState(false);

  //Count the cell's neighbors
  function countNeighbors(cellGrid, i, j) {
    let count = 0;
    for (let m = -1; m <= 1; m++) {
      for (let n = -1; n <= 1; n++) {
        const neighbourRow = i + m;
        const neighbourColumn = j + n;

        if (
          neighbourRow >= 0 &&
          neighbourColumn >= 0 &&
          neighbourRow <= cellGrid.length - 1 &&
          neighbourColumn <= cellGrid[0].length - 1
        ) {
          const value = cellGrid[neighbourRow][neighbourColumn].status;
          if (i === neighbourRow && j === neighbourColumn) {
            continue;
          } else if (value === 1 || value === 3) {
            count++;
          }
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
          if (neighbors === 2 || neighbors === 3) {
            newCellState.cellGrid[i][j].status = 3;
            if (isLongerLasting) {
              if (newCellState.cellGrid[i][j].twoFramesLife < 2) {
                newCellState.cellGrid[i][j].twoFramesLife = 2;
              }
            }
          } else {
            newCellState.cellGrid[i][j].status = 1;
          }
        } else {
          if (isLongerLasting) {
            if (newCellState.cellGrid[i][j].twoFramesLife > 0) {
              if (neighbors) {
                newCellState.cellGrid[i][j].status = 2;
                newCellState.cellGrid[i][j].lastAlive++;
              }
              newCellState.cellGrid[i][j].twoFramesLife--;
            }
          } else if (neighbors === 3) {
            newCellState.cellGrid[i][j].status = 2;
            newCellState.cellGrid[i][j].lastAlive++;
            newCellState.cellGrid[i][j].twoFramesLife = 2;
          }
        }
      }
    }
    for (let i = 0; i < newCellState.cellGrid.length; i++) {
      for (let j = 0; j < newCellState.cellGrid[i].length; j++) {
        const value = newCellState.cellGrid[i][j].status;
        if (value === 2 || value === 3) {
          newCellState.cellGrid[i][j].status = 1;
        } else if (value === 1) {
          newCellState.cellGrid[i][j].status = 0;
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
      setAuto("button active");
      intervalId = setInterval(() => {
        generateNextGeneration();
      }, INTERVAL_MS);
    } else {
      setAuto("button");
    }

    return () => clearInterval(intervalId);
  }, [cellState, isRunning]);

  useEffect(() => {
    let intervalId;
    if (isLongerLasting) {
      intervalId = setLonger("button longer-lasting active");
    } else {
      intervalId = setLonger("button longer-lasting");
    }

    return () => clearInterval(intervalId);
  }, [isLongerLasting]);

  //Reset the grid
  function handleReset() {
    contextValue.resetGrid(20, 20);
    setIsRunning(false);
    setInputCols("");
    setInputRows("");
    setErrorMsg("");
    setIsLongerLasting(false);
    setLonger("button longer-lasting");
    setAuto("button");
    setIsInputRowErr(false);
    setIsInputColErr(false);
  }

  //Single step
  function handleSingleStep() {
    setIsRunning(false);
    generateNextGeneration();
  }

  //Handle the input for the height
  function handleInputRowsChange(e) {
    setIsInputRowErr(false);
    let value = e.target.value.replace(/[^\d]/g, "").replace(/^0+/, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    setInputRows(value);
  }

  //Handle the input for the width
  function handleInputColsChange(e) {
    setIsInputColErr(false);
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
      setIsInputRowErr(true);
      setErrorMsg("Please enter a value for Height!");
      return;
    }

    if (inputCols === "") {
      setIsInputColErr(true);
      setErrorMsg("Please enter a value for Width!");
      return;
    }

    if (inputRows < 3 || inputRows > 40) {
      setIsInputRowErr(true);
      setErrorMsg("Height must be between 3 and 40!");
      return;
    }
    if (inputCols < 3 || inputCols > 40) {
      setIsInputColErr(true);
      setErrorMsg("Width must be between 3 and 40!");
      return;
    }

    contextValue.resetGrid(inputRows, inputCols);
  }

  //Handle the auto play button
  function handleAutoPlay() {
    setIsRunning(!isRunning);
  }

  //Handle the longer lasting button
  function handleLongerLasting() {
    setIsLongerLasting(!isLongerLasting);
  }

  return (
    <div>
      <h1>Game of Life</h1>

      <div>
        <div className="error">{errorMsg}</div>
        <input
          type="text"
          id="height"
          className={isInputRowErr ? "input error" : "input"}
          placeholder="Height"
          onChange={handleInputRowsChange}
          value={inputRows}
        ></input>
        <input
          type="text"
          id="width"
          className={isInputColErr ? "input error" : "input"}
          placeholder="Width"
          onChange={handleInputColsChange}
          value={inputCols}
        ></input>
        <button id="submit" className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="grid-container">
        <h3>Alive Count: {cellState.aliveCount}</h3>
        <Grid />
      </div>
      <div className="bottom">
        <button id="reset" className="button" onClick={handleReset}>
          Reset
        </button>
        <button
          id="singal"
          className="button next-fram"
          onClick={handleSingleStep}
        >
          Next Frame
        </button>
        <button id="auto-play" className={auto} onClick={handleAutoPlay}>
          Auto Play
        </button>
        <button
          id="longer-lasting"
          className={longer}
          onClick={handleLongerLasting}
        >
          Longer Lasting
        </button>
      </div>
    </div>
  );
}
