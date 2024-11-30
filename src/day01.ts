export function part1(input: string[]): string {
  let nums: number[] = [];
  nums = input.map((num) => Number(num));

  let totalFuelRequired: number = 0;
  for (let num of nums) {
    totalFuelRequired += Math.floor(num / 3) - 2;
  }

  return totalFuelRequired.toString();
}

export function part2(input: string[]): string {
  return "hello from part 2!";
}
