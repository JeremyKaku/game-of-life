import { useContext } from "react";
import { GameContext } from "../context/GameContextProvider";
import "../styles/Cell.css";

function Cell(props) {
  const { contextValue } = useContext(GameContext);
  const cellState = contextValue.cellState;
  const setCellState = contextValue.setCellState;

  let aliveStatus = cellState.cellGrid[props.row][props.col].status;
  let lastAlive = cellState.cellGrid[props.row][props.col].lastAlive;
  function onClick(index) {
    let newCellState = { ...cellState };
    newCellState.cellGrid[props.row][props.col].status =
      !newCellState.cellGrid[props.row][props.col].status;
    if (newCellState.cellGrid[props.row][props.col].status) {
      newCellState.aliveCount += 1;
    }
    setCellState(newCellState);
    console.log(index);
    // aliveStatus = !aliveStatus;
  }

  let className = "cell off";

  if (aliveStatus) {
    // className = className + "-" + lastAlive;
    className = "cell on";

    // switch (lastAlive) {
    //   case 0:
    //     className = "cell alive";
    //     break;
    //   case 1:
    //     className = "cell alive1";
    //     break;
    //   case 2:
    //     className = "cell alive2";
    //     break;
    //   case 3:
    //     className = "cell alive3";
    //     break;
    //   case 4:
    //     className = "cell alive4";
    //     break;
    //   case 5:
    //     className = "cell alive5";
    //     break;
    //   case 6:
    //     className = "cell alive6";
    //     break;
    //   case 7:
    //     className = "cell alive7";
    //     break;
    //   case 8:
    //     className = "cell alive8";
    //     break;
    //   case 9:
    //     className = "cell alive8";
    //     break;
    //   default:
    //     className = "cell alive";
    //     break;
    // }
  } else {
    className = "cell off";
  }

  return <div className={className} onClick={onClick}></div>;
}

export default Cell;
