import { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameContextProvider({ children }) {
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(20);
  // const [boxes, setBoxes] = useState(Array(ro w * col).fill(false));
  // const [selectedCountState, setSelectedCountState] = useState(0);

  // const handleClick = (index) => {
  //     const newBoxes = [...boxes];
  //     newBoxes[index] = !newBoxes[index];
  //     setBoxes(newBoxes);
  //     const count = newBoxes.filter(box => box).length;
  //     setSelectedCountState(count);
  // }

  const [cellState, setCellState] = useState(() => {
    const initialGrid = Array.from({ length: row }, () =>
      Array.from({ length: col }, () => ({
        lastAlive: 0,
        status: false,
      }))
    );

    return {
      aliveCount: 0,
      cellGrid: initialGrid,
    };
  });
  // const [cellState, setCellState] = useState({
  //   aliveCount: 0,
  //   cellGrid: [
  //     [false, false],
  //     [false, false],
  //   ],
  // });
  const contextValue = {
    cellState,
    setCellState,
    // boxes,
    // selectedCountState,
    // handleClick,
  };

  return (
    <GameContext.Provider value={{ contextValue }}>
      {children}
    </GameContext.Provider>
  );
}
