function occurencesInLine(line: string) : number {
    let forwardMatches = line.match(/XMAS/g);
    let backwardsMatches = line.match(/SAMX/g);
    return (forwardMatches === null ? 0 : forwardMatches.length) + (backwardsMatches === null ? 0 : backwardsMatches.length);
}

export function part1(input: string[]): string {
  let cleanInput = input.map((line) => line.replace(/[\n\r]/g, ""));
  let xmasCount = 0;

  // rows
  xmasCount += cleanInput.reduce((acc, line) => {
    return acc + occurencesInLine(line);
  }, 0);

  // columns
  const columns: string[] = [];
  for (let i = 0; i < cleanInput[0].length; i++) {
    const column: string = cleanInput.map((row) => row[i]).join('');
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
    for (let j = 0; j <= startingRow - startingCol; j++)
    {
      forwardDiagonal += cleanInput[startingRow - j][startingCol + j];
    }
    // 0, 0 - 0, 0         0,0
    // 1, 0 - 0, 1         1,0 0,1
    // 2, 0 - 0, 2         2,0 1,1 0,2
    // 2, 1 - 1, 2         2,1 2,1
    // 2, 2 - 2, 2         2,2
    forwardDiagonals.push(forwardDiagonal);
    startingRow = Math.min(startingRow + 1, cleanInput.length - 1);
    startingCol = (i > (2 * cleanInput[0].length - 1) / 2) ? startingCol + 1 : 0;
  }
  console.log(forwardDiagonals);

  return xmasCount.toString();
}

export function part2(input: string[]): string {
  let cleanInput = input.map((line) => line.replace(/[\n\r]/g, ""));
  let xmasCount = 0;
  return xmasCount.toString();
}
