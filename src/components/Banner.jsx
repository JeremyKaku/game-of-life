import { useState, useEffect } from "react";
import { Controller } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import { container, item } from "./animation";
import "../styles/Banner.css";
import GameOfLifeToadGif from "../assets/img/Game_of_life_toad.gif";
import GameOfLifeGliderGif from "../assets/img/Game_of_life_animated_glider.gif";
import GameOfLifeBeaconGif from "../assets/img/Game_of_life_beacon.gif";
import GameOfLifeBlinkerGif from "../assets/img/Game_of_life_blinker.gif";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [Index, setIndex] = useState(1);
  const toRotate = ["Conway's Game of Life", "Conway's Game of Life"];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <section className="banner" id="home">
      <TrackVisibility>
        {({ isVisible }) => (
          <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            <h1>
              {`Welcome to`} {text}
            </h1>
            <m.div
              animate={{ y: "0%" }}
              exit={{ opacity: 1 }}
              initial={{ y: "100%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              <main>
                <div>
                  <m.div variants={container} initial="hidden" animate="show">
                    <div>
                      <m.h2 variants={item}>Instructions</m.h2>
                      <m.p>
                        The Game of Life, also known simply as Life, is a
                        cellular automaton devised by the British mathematician
                        John Horton Conway in 1970. It is a zero-player game,
                        meaning that its evolution is determined by its initial
                        state, requiring no further input. One interacts with
                        the Game of Life by creating an initial configuration
                        and observing how it evolves. It is Turing complete and
                        can simulate a universal constructor or any other Turing
                        machine.
                      </m.p>
                      <br />
                    </div>
                    <div>
                      <m.h2 variants={item}>Rules</m.h2>
                      <m.p>
                        The universe of the Game of Life is an infinite,
                        two-dimensional orthogonal grid of square cells, each of
                        which is in one of two possible states, live or dead (or
                        populated and unpopulated, respectively). Every cell
                        interacts with its eight neighbors, which are the cells
                        that are horizontally, vertically, or diagonally
                        adjacent. At each step in time, the following
                        transitions occur:
                      </m.p>
                      <m.ol>
                        <m.li>
                          Any live cell with fewer than two live neighbors dies,
                          as if by underpopulation.
                        </m.li>
                        <m.li>
                          Any live cell with two or three live neighbors lives
                          on to the next generation.
                        </m.li>
                        <m.li>
                          Any live cell with more than three live neighbors
                          dies, as if by overpopulation.
                        </m.li>
                        <m.li>
                          Any dead cell with exactly three live neighbors
                          becomes a live cell, as if by reproduction.
                        </m.li>
                      </m.ol>
                      <m.p>
                        The initial pattern constitutes the seed of the system.
                        The first generation is created by applying the above
                        rules simultaneously to every cell in the seed, live or
                        dead; births and deaths occur simultaneously, and the
                        discrete moment at which this happens is sometimes
                        called a tick. Each generation is a pure function of the
                        preceding one. The rules continue to be applied
                        repeatedly to create further generations.
                      </m.p>
                      <br />
                    </div>
                    <div>
                      <m.h2 variants={item}>Examples of patterns</m.h2>
                      <div className="wrapper">
                        <div className="gif-container">
                          <p>Toad</p>
                          <m.img src={GameOfLifeToadGif} alt="Toad" />
                        </div>
                        <div className="gif-container">
                          <p>Beacon</p>
                          <m.img src={GameOfLifeBeaconGif} alt="Beacon" />
                        </div>
                        <div className="gif-container">
                          <p>Glider</p>
                          <m.img src={GameOfLifeGliderGif} alt="Glider" />
                        </div>
                        <div className="gif-container">
                          <p>Blinker</p>
                          <m.img src={GameOfLifeBlinkerGif} alt="Blinker" />
                        </div>
                      </div>
                    </div>
                  </m.div>
                </div>
              </main>
            </m.div>
            <Link to="/game" className="btn-link">
              <button className="btn">
                Start the game! <Controller size={27} />
              </button>
            </Link>
            <br />
          </div>
        )}
      </TrackVisibility>
    </section>
  );
};
