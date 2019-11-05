import React from "react";
import "./BoardInfo.scss";

export default function BoardInfo({ onSolveMe }) {
  return (
    <div className="c-info">
      <div className="c-info__title">
        Play
        <br />
        Sudoku!
      </div>
      <div className="c-info__description">
        You can complete this sudoku with your abilities or click the button
        below to finish it automatically :)
      </div>
      <button className="c-info__solveme" onClick={onSolveMe}>
        SOLVE ME!
      </button>
    </div>
  );
}
