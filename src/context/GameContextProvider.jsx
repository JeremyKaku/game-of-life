import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(20);
  //Alive rate
  const [rate, setRate] = useState(0.05);
  // Adjust as needed
  const [clusteringRatio, setClusteringRatio] = useState(0.02);
  // Lower probability for randomization
  const [randomizationProbability, setRandomizationProbability] =
    useState(0.01);

  // Generate clustered grid function
  const generateClusteredGrid = (numRows, numCols, initialAlivePercentage) => {
    const totalCells = Math.floor(numRows * numCols * initialAlivePercentage);
    const grid = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => ({
        twoFramesLife: 2,
        lastAlive: 0,
        status: 0,
      }))
    );

    // Create clusters
    const clusterCenters = [];
    while (clusterCenters.length < totalCells * clusteringRatio) {
      const randomRow = Math.floor(Math.random() * numRows);
      const randomCol = Math.floor(Math.random() * numCols);
      clusterCenters.push([randomRow, randomCol]);
    }

    for (const [centerRow, centerCol] of clusterCenters) {
      for (let i = -2; i <= 2; i++) {
        for (let j = -2; j <= 2; j++) {
          const newRow = centerRow + i;
          const newCol = centerCol + j;
          if (
            newRow >= 0 &&
            newRow < numRows &&
            newCol >= 0 &&
            newCol < numCols
          ) {
            // Set as alive
            grid[newRow][newCol].status = 1;
          }
        }
      }
    }

    // Fill remaining cells randomly
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (!grid[i][j].status && Math.random() < randomizationProbability) {
          // Set as alive with lower probability
          grid[i][j].status = 1;
        }
      }
    }

    return grid;
  };

  // Count alive cells function
  const countAliveCells = (grid) => {
    // return grid.flat().filter((cell) => cell).length;+
    return grid.reduce((total, row) => {
      return (
        total +
        row.reduce((rowTotal, cell) => {
          return rowTotal + cell.status;
        }, 0)
      );
    }, 0);
  };

  const [cellState, setCellState] = useState(() => {
    const grid = generateClusteredGrid(row, col, rate);
    return {
      aliveCount: countAliveCells(grid),
      cellGrid: grid,
    };
  });

  const resetGrid = (rows, cols) => {
    setCellState(() => {
      const grid = generateClusteredGrid(rows, cols, rate);
      return {
        aliveCount: countAliveCells(grid),
        cellGrid: grid,
      };
    });
  };

  const contextValue = {
    cellState,
    setCellState,
    resetGrid,
    setRow,
    setCol,
  };

  GameContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <GameContext.Provider value={{ contextValue }}>
      {children}
    </GameContext.Provider>
  );
}
