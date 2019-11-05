import React from "react";

export default function RowTable({
  row,
  rowIndex,
  selectedCell,
  moveSelectedCell,
  puzzle
}) {
  const [selectedX, selectedY] = selectedCell;

  const handleOnClick = e => {
    const dataCell = e.target.dataset.cell;
    moveSelectedCell(...dataCell.split(",").map(i => parseInt(i, 10)));
  };

  return (
    <tr className="c-board-table__row">
      {row.map((column, columnIndex) => {
        const tdClasses = ["c-board-table__column"];
        rowIndex % 3 === 0 &&
          rowIndex !== 0 &&
          tdClasses.push("c-board-table__column--border-top");
        columnIndex % 3 === 0 &&
          columnIndex !== 0 &&
          tdClasses.push("c-board-table__column--border-left");

        const cellClasses = [
          `c-board-table__cell--${
            (columnIndex + rowIndex) % 2 === 0 ? "even" : "odd"
          }`
        ];
        columnIndex === selectedX &&
          rowIndex === selectedY &&
          cellClasses.push("active");
        puzzle[rowIndex][columnIndex] && cellClasses.push("default");

        return (
          <td
            className={tdClasses.join(" ")}
            key={`${rowIndex}-${columnIndex}`}
          >
            <div
              className={cellClasses.join(" ")}
              data-cell={`${columnIndex},${rowIndex}`}
              onClick={handleOnClick}
            >
              {column}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
