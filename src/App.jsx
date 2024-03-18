import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import GameOfLife from "./pages/GameOfLife";
import Credits from "./pages/Credits";
import { Route, Routes } from "react-router-dom";
import GameContextProvider from "./context/GameContextProvider";


function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/game"
            element={
              <GameContextProvider>
                <GameOfLife />
              </GameContextProvider>
            }
          />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </div>
    </>
  );
}

export default App;