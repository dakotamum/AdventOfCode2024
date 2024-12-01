export function part1(input: string[]): string {
  // make two sets
  let set1: number[] = [];
  let set2: number[] = [];
  for (let line of input) {
    {
      let [num1, num2] = line.split(/\s+/).map(Number);
      set1.push(num1);
      set2.push(num2);
    }
  }

  // sort the two lists
  set1.sort((a, b) => a - b);
  set2.sort((a, b) => a - b);

  // add up absolute diffs
  let totalDiffs = set1.reduce(
    (acc, val, idx) => acc + Math.abs(val - set2[idx]),
    0,
  );
  return totalDiffs.toString();
}

export function part2(input: string[]): string {
  // make two sets
  let set1: number[] = [];
  let set2: number[] = [];
  for (let line of input) {
    {
      let [num1, num2] = line.split(/\s+/).map(Number);
      set1.push(num1);
      set2.push(num2);
    }
  }

  // add up sums of multiplied ids to appearances in set 2
  let totalMultipliedSums = 0;
  for (let id of set1)
    totalMultipliedSums +=
      id * set2.reduce((acc, val) => (val === id ? acc + 1 : acc), 0);
  return totalMultipliedSums.toString();
}
