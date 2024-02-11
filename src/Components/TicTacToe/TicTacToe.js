import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
import { useNavigate } from 'react-router-dom';

const TicTacToe = ({ boardSize }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);
  const boxRefs = useRef(Array.from({ length: boardSize * boardSize }, () => React.createRef()));
  const [data, setData] = useState(Array.from({ length: boardSize * boardSize }, () => ""));
  const [winningLines, setWinningLines] = useState([]);

  const toggle = (index) => {
  if (lock) {
    return;
  }
  const newData = [...data];
  if (newData[index] === "") {
    if (count % 2 === 0) {
      newData[index] = cross_icon;
    } else {
      newData[index] = circle_icon;
    }
    setCount((count) => count + 1);
    checkWin(newData);
    setData(newData);
  }
};

  const handleResize = () => {
    navigate('/');
  };

  const checkWin = (newData) => {
    const checkRows = () => {
      for (let i = 0; i < boardSize; i++) {
        const rowStartIndex = i * boardSize;
        const rowEndIndex = rowStartIndex + boardSize;
        const rowValues = newData.slice(rowStartIndex, rowEndIndex);
        if (rowValues.every((value) => value === cross_icon)) {
          won("x", `row${i}`);
          return true;
        } else if (rowValues.every((value) => value === circle_icon)) {
          won("o", `row${i}`);
          return true;
        }
      }
      return false;
    };

    const checkColumns = () => {
      for (let i = 0; i < boardSize; i++) {
        const columnValues = [];
        for (let j = 0; j < boardSize; j++) {
          columnValues.push(newData[j * boardSize + i]);
        }
        if (columnValues.every((value) => value === cross_icon)) {
          won("x", `col${i}`);
          return true;
        } else if (columnValues.every((value) => value === circle_icon)) {
          won("o", `col${i}`);
          return true;
        }
      }
      return false;
    };

    const checkDiagonals = () => {
      const diagonal1 = [];
      const diagonal2 = [];
      for (let i = 0; i < boardSize; i++) {
        diagonal1.push(newData[i * (boardSize + 1)]);
        diagonal2.push(newData[(i + 1) * (boardSize - 1)]);
      }
      if (diagonal1.every((value) => value === cross_icon) || diagonal2.every((value) => value === cross_icon)) {
        won("x", 'diagonal');
        return true;
      } else if (diagonal1.every((value) => value === circle_icon) || diagonal2.every((value) => value === circle_icon)) {
        won("o", 'diagonal');
        return true;
      }
      return false;
    };

    if (!checkRows() && !checkColumns() && !checkDiagonals()) {
      if (newData.every((value) => value !== "")) {
        titleRef.current.innerHTML = "It's a draw!";
        setLock(true);
      }
    }
  };

  const won = (winner, lineType) => {
    setLock(true);
    titleRef?.current && (titleRef.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon}> Win`);
    const lines = [...winningLines];
    if (!lines.includes(lineType)) {
      lines.push(lineType);
    }
    setWinningLines(lines);
    const winningBoxes = document.querySelectorAll(`.${lineType}`);
    winningBoxes.forEach(box => {
      if (winner === 'x') {
        box.style.backgroundColor = 'yellow';
      } else {
        box.style.backgroundColor = 'blue';
      }
    });
  };

  const reset = () => {
    setLock(false);
    setCount(0);
    titleRef?.current && (titleRef.current.innerHTML = "Enjoy The Game");
    setData(Array.from({ length: boardSize * boardSize }, () => ""));
    const allBoxes = document.querySelectorAll('.boxes');
    allBoxes.forEach(box => {
      box.style.backgroundColor = '#1f3540';
    });
    setWinningLines([]);
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
      </h1>
      <div className="buttons-container">
        <button className="reset" onClick={() => reset()}>Reset</button>
        <button className="resize-button" onClick={handleResize}>Resize</button>
      </div>
      <div className="board">
        {Array.from({ length: boardSize }, (_, i) => (
          <div className={`row${i + 1}`} key={i}>
            {Array.from({ length: boardSize }, (_, j) => (
              <div
                className={`boxes row${i} col${j}`}
                key={j}
                ref={boxRefs.current[i * boardSize + j]}
                onClick={() => toggle(i * boardSize + j)}
                style={{
                  width: `calc(90vh / ${boardSize})`,
                  height: `calc(90vh / ${boardSize})`,
                  maxWidth: '100px',
                  maxHeight: '100px',
                  margin: '4px',
                }}
              >
                {data[i * boardSize + j] && (
                  <img src={data[i * boardSize + j]} alt="icon" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>      
  );
};

export default TicTacToe;
