import "./App.css";
import { useEffect, useState } from "react";
import Snake from "./Snake";
import Food from "./Food";

let intailState = [
  [0, 0],
  [2, 0],
  [4, 0],
  [6, 0],
  [8, 0],
  [10, 0],
  [12, 0],
  [14, 0],
  [16, 0],
  [18, 0],
];

function getRandomCoordinates() {
  let min = 1;
  let max = 97;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

function App() {
  const [food, setFood] = useState(getRandomCoordinates());
  const [speed, setSpeed] = useState(500);
  const [snakeDots, setSnakeDots] = useState(intailState);
  const [direction, setDirection] = useState("RIGHT");

  onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        setDirection("LEFT");
        break;
      case 38:
        setDirection("UP");
        break;
      case 39:
        setDirection("RIGHT");
        break;
      case 40:
        setDirection("DOWN");
        break;
      default:
        break;
    }
  };
  function changeSpeed(e) {
    switch (e.keyCode) {
      case 86:
        setSpeed(speed / 2);
        break;
      case 82:
        setSpeed(speed * 2);
        break;
      default:
        break;
    }
  }

  function moveSnake() {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }

  function checkIfOutOfBorder() {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] > 100 || head[0] < 0 || head[1] > 100 || head[1] < 0) {
      alert("Game Over  Your score is " + snakeDots.length);
      setDirection("RIGHT");
      setSnakeDots(intailState);
      setSpeed(500);
    }
  }

  function checkIfEatFood() {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates());

      setSnakeDots([
        ...snakeDots,
        [
          snakeDots[snakeDots.length - 1][0],
          snakeDots[snakeDots.length - 1][1],
        ],
      ]);
    }
  }

  function shorterSnake() {
    let dots = [...snakeDots];
    dots.shift();
    setSnakeDots(dots);
    if (snakeDots.length === 0) {
      alert("Game Over  Your score is " + snakeDots.length);
      setDirection("RIGHT");
      setSnakeDots(intailState);
      setSpeed(500);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onkeydown);
    window.addEventListener("keydown", changeSpeed);
    checkIfOutOfBorder();
    checkIfEatFood();
    let timeOut2 = setTimeout(shorterSnake, speed);
    let timeOut = setTimeout(moveSnake, speed);
    return () => {
      clearTimeout(timeOut);
      clearTimeout(timeOut2);
      window.removeEventListener("keydown", onkeydown);
    };
  }, [direction, snakeDots, speed]);

  return (
    <div className="App">
      <div className="game-box">
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
      </div>
    </div>
  );
}

export default App;
