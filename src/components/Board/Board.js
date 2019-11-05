import React, { useEffect, useState, useCallback, useRef } from "react";
import { cloneDeep } from "lodash";
import BoardNumber from "../BoardNumber";
import TableRow from "../BoardTableRow";
import { checkAll, hasNull } from "../../helpers/puzzle";
import BoardHeader from "../BoardHeader/BoardHeader";
import "./Board.scss";

function Board({
  puzzle,
  puzzleNumber,
  time,
  isPlay,
  message,
  onNewGame,
  onSolveMe,
  onToggleClick,
  setMessage
}) {
  const [puzzleAnswers, setPuzzleAnswers] = useState(cloneDeep(puzzle));
  const [selectedCell, setSelectedCell] = useState([0, 0]);
  const [inputNumber, setInputNumber] = useState(null);
  const x = useRef(selectedCell[0]);
  const y = useRef(selectedCell[1]);

  // update ref every re-render
  x.current = selectedCell[0];
  y.current = selectedCell[1];

  useEffect(() => {
    setPuzzleAnswers(cloneDeep(puzzle));
  }, [puzzleNumber, puzzle]);

  useEffect(() => {
    if (!hasNull(puzzleAnswers)) {
      setMessage(checkAll(puzzleAnswers));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputNumber, setMessage]);

  useEffect(() => {
    // allow changing number when there's no default number in puzzle
    if (!puzzle[y.current][x.current]) {
      if (inputNumber) {
        setPuzzleAnswers(prevPuzzleAnswers => {
          prevPuzzleAnswers[y.current][x.current] = inputNumber;
          return prevPuzzleAnswers;
        });
      } else if (inputNumber === 0) {
        setPuzzleAnswers(prevPuzzleAnswers => {
          prevPuzzleAnswers[y.current][x.current] = null;
          return prevPuzzleAnswers;
        });
      }
    }
    setInputNumber(null);
  }, [inputNumber, puzzle]);

  const handleOnKeyDown = useCallback(e => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowLeft":
        x.current = x.current - 1 < 0 ? 8 : x.current - 1;
        break;
      case "ArrowUp":
        y.current = y.current - 1 < 0 ? 8 : y.current - 1;
        break;
      case "ArrowRight":
        x.current = x.current + 1 > 8 ? 0 : x.current + 1;
        break;
      case "ArrowDown":
        y.current = y.current + 1 > 8 ? 0 : y.current + 1;
        break;
      case "Backspace":
        setInputNumber(0);
        break;
      default:
        if (`Digit${e.key}` === e.code) {
          setInputNumber(parseInt(e.key, 10));
        }
        break;
    }
    setSelectedCell([x.current, y.current]);
  }, []);

  const addKeyDownEvent = useCallback(() => {
    document.addEventListener("keydown", handleOnKeyDown);
  }, [handleOnKeyDown]);
  const removeKeyDownEvent = useCallback(() => {
    document.removeEventListener("keydown", handleOnKeyDown);
  }, [handleOnKeyDown]);

  const moveSelectedCell = (newX, newY) => {
    setSelectedCell([newX, newY]);
  };

  const text = useRef("");
  return (
    <div className="c-board">
      <BoardHeader
        time={time}
        isPlay={isPlay}
        message={message}
        onNewGame={onNewGame}
        onToggleClick={onToggleClick}
      />
      <table
        className="c-board-table"
        onFocus={addKeyDownEvent}
        onBlur={removeKeyDownEvent}
        tabIndex="0"
      >
        <tbody>
          {puzzleAnswers.map((row, rowIndex) => (
            <TableRow
              row={row}
              rowIndex={rowIndex}
              key={rowIndex}
              selectedCell={selectedCell}
              moveSelectedCell={moveSelectedCell}
              puzzle={puzzle}
            />
          ))}
        </tbody>
      </table>
      <BoardNumber setInputNumber={setInputNumber} />

      <button className="c-board__solveme-mobile" onClick={onSolveMe}>
        Solve Me!
      </button>
      <p ref={text}></p>
    </div>
  );
}

export default Board;
