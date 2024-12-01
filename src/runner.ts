import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from "fs";

(async () => {
  try {
    // process args
    const argv = yargs(hideBin(process.argv))
      .option("day", {
        alias: "d",
        type: "number",
        description: "Day to run",
        demandOption: true,
      })
      .option("part", {
        alias: "p",
        type: "number",
        description: "Part to run (1 or 2)",
        demandOption: true,
      })
      .help()
      .parseSync();

    const day = String(argv.day).padStart(2, "0");
    const part = argv.part;

    // import module for the day
    const modulePath = `./day${day}`;
    const module = await import(modulePath);

    // get part function
    const partFunction = module[`part${part}`];
    if (typeof partFunction !== "function") {
      throw new Error(`Part ${part} is not implemented for day ${argv.day}`);
    }

    // get input
    const inputFilePath = `inputs/day${day}.txt`;
    const input = fs.readFileSync(inputFilePath, "utf-8");

    // Remove the last line if it's blank
    let lines = input.trim().split("\n");
    if (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    // run the day/part
    const result = partFunction(lines);
    console.log(`Day ${argv.day}, Part ${argv.part}:`, result);
  } catch (error) {
    console.log("Error: ", error);
  }
})();
