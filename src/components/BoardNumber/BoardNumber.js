import React from "react";

export default function BoardNumber({ setInputNumber }) {
  const handleOnClick = e => {
    setInputNumber(parseInt(e.target.dataset.value, 10));
  };
  return (
    <table className="c-board-number">
      <tbody>
        <tr>
          {[...Array(10).keys()]
            .filter(val => val)
            .map(number => (
              <td key={number} style={{ padding: 0 }}>
                <div
                  className="c-board-number__number"
                  onClick={handleOnClick}
                  data-value={number}
                >
                  {number}
                </div>
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
}
