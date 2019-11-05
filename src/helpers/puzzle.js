import { sortBy } from "lodash";

export const hasNull = puzzle => {
  // find null
  for (const row of puzzle) {
    if (row.some(val => val === null)) return true;
  }
  return false;
};

export const hasDuplicateValueInArray = (array = []) => {
  const sortedArray = sortBy(array);

  // find duplicate value
  return sortedArray.some((val, index, array) => {
    return val === array[index + 1];
  });
};

export const isHorizontalCorrect = puzzle => {
  for (const row of puzzle) {
    if (hasDuplicateValueInArray(row)) return false;
  }
  return true;
};

export const isVerticalCorrect = puzzle => {
  // x is horizontal line
  // y is vertical line
  let x = 0;
  let y = 0;
  while (x < puzzle[y].length) {
    let verticalRow = [];
    // create new array from vertical line in order to sort and find duplicate
    while (y < puzzle.length) {
      verticalRow.push(puzzle[y][x]);
      y++;
    }

    if (hasDuplicateValueInArray(verticalRow)) return false;
    x++;
    y = 0;
  }
  return true;
};

export const isBoxNumberCorrect = puzzle => {
  const maxGroup = puzzle.length;
  let indexGroup = 1;
  let x = 0,
    y = 0,
    xMin = 0,
    xMax = 3,
    yMin = 0,
    yMax = 3;
  while (indexGroup <= maxGroup) {
    const group = [];
    for (y = yMin; y < yMax; y++) {
      for (x = xMin; x < xMax; x++) {
        group.push(puzzle[y][x]);
      }
    }
    if (indexGroup % 3 === 0) {
      yMin = yMin + 3;
      yMax = yMax + 3;
      xMin = 0;
      xMax = 3;
    } else {
      xMin = xMin + 3;
      xMax = xMax + 3;
    }
    indexGroup++;

    if (hasDuplicateValueInArray(group)) return false;
  }
  return true;
};

export const checkAll = puzzle => {
  if (hasNull(puzzle)) {
    return "Still have empty box!!";
  }
  if (!isHorizontalCorrect(puzzle)) {
    return "Please check horizontally";
  }
  if (!isVerticalCorrect(puzzle)) {
    return "Please check vertically";
  }
  if (!isBoxNumberCorrect(puzzle)) {
    return "Please check in box";
  }
  return "Sudoku Completed!!"
};
