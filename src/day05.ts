export function part1(input: string[]): string {
  let normalizedInput = input.map((line) => line.trim());
  let blankLineIndex = normalizedInput.indexOf("");
  let section1 = normalizedInput.slice(0, blankLineIndex);
  let section2 = normalizedInput.slice(blankLineIndex + 1);

  let numberMap = new Map<number, number[]>();

  for (let line of section1) {
    let lineIndex = line.indexOf("|");
    let num1 = Number(line.slice(0, lineIndex));
    let num2 = Number(line.slice(lineIndex + 1));

    if (numberMap.has(num1)) numberMap.get(num1)?.push(num2);
    else numberMap.set(num1, [num2]);
  }

  let totalsOfMiddleNumbers = 0;

  for (let line of section2) {
    let valid = true;
    let numbers = line.split(",").map((num) => Number(num));
    let prevNum = numbers[0];
    for (let num of numbers.slice(1)) {
      if (numberMap.get(prevNum)?.includes(num)) prevNum = num;
      else {
        valid = false;
        break;
      }
    }
    if (valid) totalsOfMiddleNumbers += numbers[(numbers.length - 1) / 2];
  }
  return totalsOfMiddleNumbers.toString();
}

export function part2(input: string[]): string {
  let normalizedInput = input.map((line) => line.trim());
  let blankLineIndex = normalizedInput.indexOf("");
  let section1 = normalizedInput.slice(0, blankLineIndex);
  let section2 = normalizedInput.slice(blankLineIndex + 1);

  let numberMap = new Map<number, number[]>();

  for (let line of section1) {
    let lineIndex = line.indexOf("|");
    let num1 = Number(line.slice(0, lineIndex));
    let num2 = Number(line.slice(lineIndex + 1));

    if (numberMap.has(num1)) numberMap.get(num1)?.push(num2);
    else numberMap.set(num1, [num2]);
  }

  let totalsOfMiddleNumbers = 0;

  for (let line of section2) {
    // see if the line is valid
    let valid = true;
    let numbers = line.split(",").map((num) => Number(num));
    let prevNum = numbers[0];
    for (let num of numbers.slice(1)) {
      if (numberMap.get(prevNum)?.includes(num)) prevNum = num;
      else {
        valid = false;
        break;
      }
    }
    if (valid) continue;
    // make it valid
    while (!valid) {
      valid = true;
      let unorderedPageNum = -1;
      let prevNum = numbers[0];
      // get unordered page number
      for (let num of numbers.slice(1)) {
        if (numberMap.has(prevNum)) {
          if (numberMap.get(prevNum)?.includes(num)) prevNum = num;
          else {
            unorderedPageNum = num;
            valid = false;
            break;
          }
        } else {
          unorderedPageNum = prevNum;
          valid = false;
          break;
        }
      }
      if (!valid) {
        // remove unordered page from array, find a new home for it between two valid places
        numbers = numbers.filter((num) => num !== unorderedPageNum);
        let newIndex = -1;
        for (let i = 1; i < numbers.length; i++) {
          if (
            numberMap.get(numbers[i - 1])?.includes(unorderedPageNum) &&
            numberMap.get(unorderedPageNum)?.includes(numbers[i])
          ) {
            newIndex = i;
            break;
          }
        }
        if (newIndex === -1) {
          if (numberMap.get(unorderedPageNum)?.includes(numbers[0]))
            numbers.unshift(unorderedPageNum);
          else if (
            numberMap
              .get(numbers[numbers.length - 1])
              ?.includes(unorderedPageNum)
          )
            numbers.push(unorderedPageNum);
        } else numbers.splice(newIndex, 0, unorderedPageNum);
      } else totalsOfMiddleNumbers += numbers[(numbers.length - 1) / 2];
    }
  }

  return totalsOfMiddleNumbers.toString();
}
