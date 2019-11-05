import React, { useEffect, useState } from "react";
import "./BoardHeader.scss";

export default function BoardHeader({
  time,
  isPlay,
  message,
  onNewGame,
  onToggleClick
}) {
  const [toggleClasses, setToggleClasses] = useState(["fa", "fa-pause"]);
  const handleOnClick = () => {
    if (toggleClasses.includes("fa-pause")) {
      onToggleClick(false);
    } else {
      onToggleClick(true);
    }
  };

  useEffect(() => {
    if (isPlay) {
      setToggleClasses(["fa", "fa-pause"]);
    } else {
      setToggleClasses(["fa", "fa-play"]);
    }
  }, [isPlay]);

  return (
    <div className="c-board-header">
      <button className="c-board-header__newgame" onClick={onNewGame}>
        <i className="fa fa-plus"></i> NEW GAME
      </button>
      <p className="c-board-header__message">{message}</p>
      <div className="c-board-header__time c-time">
        <div className="c-time__label">Time Remaining</div>
        <div className="c-time__minute-wrapper">
          <button className="c-time__pause-play" disabled>
            <i className={toggleClasses.join(" ")} onClick={handleOnClick}></i>
          </button>
          <div className="c-time__minute">
            {new Date(1000 * time).toISOString().substr(11, 8)}
          </div>
        </div>
      </div>
    </div>
  );
}
