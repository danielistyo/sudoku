import React, { useState, useCallback, useEffect } from "react";
import Board from "./components/Board";
import data from "./data";
import { interval } from "./helpers/intervals";
import Header from "./components/Header/Header";
import BoardInfo from "./components/BoardInfo/BoardInfo";
import "./App.scss";

const COUNTDOWN_TIME = 600;
const { puzzles, solutions } = data;

function App() {
  const [puzzleNumber, setPuzzleNumber] = useState(puzzles.length - 1);
  const [puzzle, setPuzzle] = useState(puzzles[puzzleNumber]);
  const [isPlay, setIsPlay] = useState(false);
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setPuzzle(puzzles[puzzleNumber]);
  }, [puzzleNumber]);

  useEffect(() => {
    if (time > 0 && isPlay) {
      interval.clearAll();
      interval.make(() => {
        setTime(time - 1);
        clearInterval(interval);
      }, 1000);
    } else if (time === 0 && isPlay) {
      setMessage("Time's up!!!");
    }
  }, [time, isPlay]);

  const handleToggleTime = useCallback(status => {
    setIsPlay(status);
  }, []);

  const handleSolveMe = useCallback(() => {
    if (solutions[puzzleNumber]) {
      setPuzzle(solutions[puzzleNumber]);
      handleToggleTime(false);
      interval.clearAll();
      setTime(0);
      setMessage("Sudoku Completed!!");
    }
  }, [puzzleNumber, handleToggleTime]);

  const handleNewPuzzle = useCallback(() => {
    setPuzzleNumber((puzzleNumber + 1) % (puzzles.length - 1));
    handleToggleTime(true);
    setTime(COUNTDOWN_TIME);
    setMessage("");
  }, [puzzleNumber, handleToggleTime]);

  return (
    <div className="c-app">
      <Header />
      <div className="c-app__body">
        <BoardInfo onSolveMe={handleSolveMe} />
        <Board
          puzzle={puzzle}
          puzzleNumber={puzzleNumber}
          time={time}
          isPlay={isPlay}
          message={message}
          setMessage={setMessage}
          onNewGame={handleNewPuzzle}
          onSolveMe={handleSolveMe}
          onToggleClick={handleToggleTime}
        />
      </div>
    </div>
  );
}

export default App;
