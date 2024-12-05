export function part1(input: string[]): string {
  let cleanInput = input.map((line) => line.replace(/[\n\r]/g, ""));
  let xmasCount = 0;

  function occurencesInLine(line: string): number {
    let forwardMatches = line.match(/XMAS/g);
    let backwardsMatches = line.match(/SAMX/g);
    return (
      (forwardMatches === null ? 0 : forwardMatches.length) +
      (backwardsMatches === null ? 0 : backwardsMatches.length)
    );
  }

  // rows
  xmasCount += cleanInput.reduce((acc, line) => {
    return acc + occurencesInLine(line);
  }, 0);

  // columns
  const columns: string[] = [];
  for (let i = 0; i < cleanInput[0].length; i++) {
    const column: string = cleanInput.map((row) => row[i]).join("");
    columns.push(column);
  }
  xmasCount += columns.reduce((acc, line) => {
    return acc + occurencesInLine(line);
  }, 0);

  // forward diagonal
  let forwardDiagonals: string[] = [];
  let startingRow = 0;
  let startingCol = 0;
  for (let i = 0; i < 2 * cleanInput[0].length - 1; i++) {
    let forwardDiagonal = "";
    for (let j = 0; j <= startingRow - startingCol; j++) {
      forwardDiagonal += cleanInput[startingRow - j][startingCol + j];
    }
    forwardDiagonals.push(forwardDiagonal);
    startingRow = Math.min(startingRow + 1, cleanInput.length - 1);
    startingCol =
      i > (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingCol + 1
        : startingCol;
  }
  xmasCount += forwardDiagonals.reduce((acc, line) => {
    return acc + occurencesInLine(line);
  }, 0);

  // back diagonal
  let backDiagonals: string[] = [];
  startingRow = 0;
  startingCol = cleanInput[0].length - 1;
  for (let i = 0; i < 2 * cleanInput[0].length - 1; i++) {
    let backDiagonal = "";
    for (
      let j = 0;
      j <= cleanInput[0].length - 1 - Math.max(startingRow, startingCol);
      j++
    )
      backDiagonal += cleanInput[startingRow + j][startingCol + j];

    backDiagonals.push(backDiagonal);
    startingCol =
      i < (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingCol - 1
        : startingCol;
    startingRow =
      i > (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingRow + 1
        : startingRow;
  }
  xmasCount += backDiagonals.reduce((acc, line) => {
    return acc + occurencesInLine(line);
  }, 0);

  return xmasCount.toString();
}

export function part2(input: string[]): string {
  let cleanInput = input.map((line) => line.replace(/[\n\r]/g, ""));
  let xmasCount = 0;

  function indicesInLine(line: string): number[] {
    let matchIndices: number[] = [];
    let idx = 0;
    while (idx !== -1) {
      idx = line.indexOf("MAS", idx);
      if (idx !== -1) {
        matchIndices.push(idx + 1); // location of potential 'A' intersect
        idx += 2;
      }
    }
    idx = 0;
    while (idx !== -1) {
      idx = line.indexOf("SAM", idx);
      if (idx !== -1) {
        matchIndices.push(idx + 1);
        idx += 2;
      }
    }
    return matchIndices;
  }

  let numIntersections = 0;

  // forward diagonal
  let startingRow = 0;
  let startingCol = 0;
  let foundMiddleAs: number[][] = [];

  for (let i = 0; i < 2 * cleanInput[0].length - 1; i++) {
    let forwardDiagonal = "";
    for (let j = 0; j <= startingRow - startingCol; j++)
      forwardDiagonal += cleanInput[startingRow - j][startingCol + j];

    indicesInLine(forwardDiagonal).forEach((idx) => {
      foundMiddleAs.push([startingRow - idx, startingCol + idx]);
    });

    startingRow = Math.min(startingRow + 1, cleanInput.length - 1);
    startingCol =
      i > (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingCol + 1
        : startingCol;
  }

  // back diagonal
  startingRow = 0;
  startingCol = cleanInput[0].length - 1;
  for (let i = 0; i < 2 * cleanInput[0].length - 1; i++) {
    let backDiagonal = "";
    for (
      let j = 0;
      j <= cleanInput[0].length - 1 - Math.max(startingRow, startingCol);
      j++
    )
      backDiagonal += cleanInput[startingRow + j][startingCol + j];

    indicesInLine(backDiagonal).forEach((idx) => {
      if (
        foundMiddleAs.some((arr) => {
          return arr[0] === startingRow + idx && arr[1] === startingCol + idx;
        })
      )
        ++numIntersections;
    });

    startingCol =
      i < (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingCol - 1
        : startingCol;
    startingRow =
      i > (2 * cleanInput[0].length - 1) / 2 - 1
        ? startingRow + 1
        : startingRow;
  }

  return numIntersections.toString();
}
