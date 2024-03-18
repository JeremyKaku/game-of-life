import { useContext } from "react";
import { GameContext } from "../context/GameContextProvider";
import "../styles/Cell.css";
import PropTypes from "prop-types";

function Cell(props) {
  const { contextValue } = useContext(GameContext);
  const cellState = contextValue.cellState;
  const setCellState = contextValue.setCellState;

  let aliveStatus = cellState.cellGrid[props.row][props.col].status;
  let lastAlive = cellState.cellGrid[props.row][props.col].lastAlive;

  function onClick() {
    let newCellState = { ...cellState };
    newCellState.cellGrid[props.row][props.col].status =
      !newCellState.cellGrid[props.row][props.col].status;
    if (newCellState.cellGrid[props.row][props.col].status) {
      newCellState.aliveCount += 1;
    }
    lastAlive = newCellState.cellGrid[props.row][props.col].lastAlive;
    setCellState(newCellState);
  }

  let className = "cell";

  if (aliveStatus) {
    switch (lastAlive) {
      case 0:
        className += " heatmap-" + lastAlive;
        break;
      case 1:
        className += " heatmap-" + lastAlive;
        break;
      case 2:
        className += " heatmap-" + lastAlive;
        break;
      case 3:
        className += " heatmap-" + lastAlive;
        break;
      case 4:
        className += " heatmap-" + lastAlive;
        break;
      case 5:
        className += " heatmap-" + lastAlive;
        break;
      case 6:
        className += " heatmap-" + lastAlive;
        break;
      case 7:
        className += " heatmap-" + lastAlive;
        break;
      case 8:
        className += " heatmap-" + lastAlive;
        break;
      case 9:
        className += " heatmap-" + lastAlive;
        break;
      default:
        className += " heatmap-10";
        break;
    }
  } else {
    className += " off";
  }

  Cell.propTypes = {
    row: PropTypes.number,
    col: PropTypes.number,
  };

  return <div className={className} onClick={onClick}></div>;
}

export default Cell;
