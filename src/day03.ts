export function part1(input: string[]): string {
  let multipleSums = 0;
  for (let line of input) {
    let matches = line.match(/mul\(s*\d+\s*\,s*\d+\s*\)/g);
    multipleSums += matches
      ? matches.reduce((acc, match) => {
          let numbers = match.match(/\d+/g)?.map(Number);
          if (
            numbers != null &&
            numbers[0] != undefined &&
            numbers[1] != undefined
          )
            return acc + numbers[0] * numbers[1];
          else return acc;
        }, 0)
      : 0;
  }
  return multipleSums.toString();
}

export function part2(input: string[]): string {
  let cleanInput = input.map((line) => line.replace(/[\n\r]/g, ""));
  let newInput = cleanInput.join(" ");
  let multipleSums = 0;
  let lineWithoutDontDo = newInput.replace(/don't\(\)(.*?)do\(\)/g, "");
  let finalLine = lineWithoutDontDo.replace(/don't\(\)(.*)$/, "");
  let matches = finalLine.match(/mul\(s*\d+\s*\,s*\d+\s*\)/g);
  multipleSums += matches
    ? matches.reduce((acc, match) => {
        let numbers = match.match(/\d+/g)?.map(Number);
        if (
          numbers != null &&
          numbers[0] != undefined &&
          numbers[1] != undefined
        )
          return acc + numbers[0] * numbers[1];
        else return acc;
      }, 0)
    : 0;
  return multipleSums.toString();
}
