import { useContext } from "react";
import { GameContext } from "../context/GameContextProvider.jsx";
import Cell from "../components/Cell.jsx";
import "../styles/Grid.css";

function Grid() {
  const { contextValue } = useContext(GameContext);
  const gridComponent = [];

  for (let i = 0; i < contextValue.cellState.cellGrid.length; i++) {
    const rowConponent = [];
    const row = contextValue.cellState.cellGrid[i];

    for (let j = 0; j < row.length; j++) {
      rowConponent.push(<Cell key={`${i}-${j}`} row={i} col={j} />);
    }
    gridComponent.push(
      <div key={i} className="cellRow">
        {rowConponent}
      </div>
    );
  }
  return gridComponent;
}

export default Grid;
