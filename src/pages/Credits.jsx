import { useState, useRef } from "react";
import { Play, Pause } from "react-bootstrap-icons";
import "../styles/Credits.css";

export default function Credits() {
  const [isScrolling, setIsScrolling] = useState(true);
  const marqueeRef = useRef(null);

  const toggleScrolling = () => {
    setIsScrolling(!isScrolling);
    if (marqueeRef.current) {
      if (isScrolling) {
        marqueeRef.current.stop();
      } else {
        marqueeRef.current.start();
      }
    }
  };

  return (
    <div className="credits-container">
      <h1>About This App</h1>
      <div className="scrolling-container">
        <marquee direction="up" scrollamount="3" ref={marqueeRef}>
          <div>
            <p>
              This app was developed by <strong>Jing Guo & Xue Han</strong>.
            </p>
            <br />
            <p>This app uses the following technologies:</p>
            <div className="list-container">
              <ul>
                <li>React</li>
                <li>JavaScript</li>
                <li>React-router-dom</li>
                <li>Framer-motion</li>
                <li>React-bootstrap-icons</li>
              </ul>
            </div>
            <br />
            <p>
              GitHub Repository:{" "}
              <a href="https://github.com/JeremyKaku/jing-guo-xue-han-assignment2.git">
                Click Here
              </a>
            </p>
          </div>
        </marquee>
      </div>
      <button className="btn" onClick={toggleScrolling}>
        {isScrolling ? "Pause" : "Play"}
        {isScrolling ? <Pause size={27} /> : <Play size={27} />}
      </button>
    </div>
  );
}
