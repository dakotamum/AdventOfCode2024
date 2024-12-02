function isReportSafe(report: number[]): boolean {
  let isSafe = true;
  let isIncreasing = report[1] - report[0] > 0;

  for (let i = 0; i < report.length - 1; i++) {
    let diff = report[i + 1] - report[i];
    if (
      !(
        ((isIncreasing && diff > 0) || (!isIncreasing && diff < 0)) &&
        Math.abs(diff) < 4
      )
    ) {
      isSafe = false;
      break;
    }
  }
  return isSafe;
}

export function part1(input: string[]): string {
  let reports: number[][] = input.map((line) => line.split(" ").map(Number));
  let safeReportsCount = reports.reduce(
    (acc, report) => (isReportSafe(report) ? acc + 1 : acc),
    0,
  );
  return safeReportsCount.toString();
}

export function part2(input: string[]): string {
  let reports: number[][] = input.map((line) => line.split(" ").map(Number));
  let safeReportsCount = reports.reduce((acc, report) => {
    let isSafe = false;

    // see if report is safe as-is
    if (!isReportSafe(report)) {
      // see if report is safe if any one element is removed
      for (let i = 1; i < report.length - 1; i++) {
        let tempNums1 = [...report]
          .slice(0, i - 1)
          .concat([...report].slice(i));
        let tempNums2 = [...report]
          .slice(0, i)
          .concat([...report].slice(i + 1));
        let tempNums3 = [...report]
          .slice(0, i + 1)
          .concat([...report].slice(i + 2));
        if (
          isReportSafe(tempNums1) ||
          isReportSafe(tempNums2) ||
          isReportSafe(tempNums3)
        ) {
          isSafe = true;
          break;
        }
      }
    } else isSafe = true;
    return isSafe ? acc + 1 : acc;
  }, 0);

  return safeReportsCount.toString();
}
