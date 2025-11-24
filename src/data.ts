import { Smush32, SYSTEM } from '@thi.ng/random';
import { getCalculation } from './calculations';

const operatorList = ['+', '-', 'x', '/'];
export const operators = '[' + operatorList.join('') + '=]';
const userInputSymbol = '_';

export function getData() {
  // const puzzle = [
  //   ['_', 'x', '_', '-', '_', '=', '15'],
  //   ['+', ' ', '+', ' ', 'x', ' ', ' '],
  //   ['_', 'x', '_', '/', '_', '=', '15'],
  //   ['x', ' ', '-', ' ', '+', ' ', ' '],
  //   ['_', 'x', '_', '-', '_', '=', '3'],
  //   ['=', ' ', '=', ' ', '=', ' ', ' '],
  //   ['9', ' ', '6', ' ', '22', ' ', ' '],
  // ];
  // const solution = [
  //   ['3', '8', '9'],
  //   ['6', '5', '2'],
  //   ['1', '7', '4'],
  // ];
  const { puzzle, solution } = generateGame(0);
  return { puzzle, solution };
}

export function getRandomGame() {
  return generateGame(SYSTEM.int());
}

export function generateGame(seed: number): { puzzle: string[][]; solution: number[][] } {
  console.log('seed = ', seed);
  const prng = new Smush32(2506 + seed);
  const valid: number[] = [];
  // Generate solution
  const solution: number[][] = [[], [], []];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let next;
      do {
        next = prng.minmaxInt(1, 10);
      } while (valid.includes(next));
      solution[i]!.push(next);
      valid.push(next);
    }
  }
  // Initialise grid
  const puzzle = [];
  for (let i = 0; i < 7; i++) {
    puzzle.push(Array.from(' '.repeat(7)));
  }
  console.log(puzzle);
  // Add equals signs to grid
  puzzle[0]![5] =
    puzzle[2]![5] =
    puzzle[4]![5] =
    puzzle[5]![0] =
    puzzle[5]![2] =
    puzzle[5]![4] =
      '=';
  // Add input spaces to grid
  puzzle[0]![0] =
    puzzle[0]![2] =
    puzzle[0]![4] =
    puzzle[2]![0] =
    puzzle[2]![2] =
    puzzle[2]![4] =
    puzzle[4]![0] =
    puzzle[4]![2] =
    puzzle[4]![4] =
      userInputSymbol;
  // Add row operators to grid
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      const operatorX = i * 2;
      const operatorY = j * 2 + 1;
      let operatorInd = -1;
      // If division results in a whole number, allow division as an operator
      if (solution[i]![j]! % solution[i]![j + 1]! == 0) {
        operatorInd = prng.minmaxInt(0, 4);
      } else {
        operatorInd = prng.minmaxInt(0, 3);
      }
      const operator = operatorList[operatorInd]!;
      puzzle[operatorX]![operatorY] = operator;
    }
    puzzle[i * 2]![6] = String(
      getCalculation(
        solution[i]![0]!,
        solution[i]![1]!,
        solution[i]![2]!,
        puzzle[i * 2]![1]!,
        puzzle[i * 2]![3]!,
      ),
    );
    console.log(
      solution[i]![0]!,
      solution[i]![1]!,
      solution[i]![2]!,
      puzzle[i * 2]![1]!,
      puzzle[i * 2]![3]!,
      puzzle[i * 2]![6],
    );
  }
  // Add column operators to grid
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      const operatorX = j * 2 + 1;
      const operatorY = i * 2;
      let operatorInd = -1;
      // If division results in a whole number, allow division as an operator
      if (solution[j]![i]! % solution[j + 1]![i]! == 0) {
        operatorInd = prng.minmaxInt(0, 4);
      } else {
        operatorInd = prng.minmaxInt(0, 3);
      }
      const operator = operatorList[operatorInd]!;
      puzzle[operatorX]![operatorY] = operator;
    }
    puzzle[6]![i * 2] = String(
      getCalculation(
        solution[0]![i]!,
        solution[1]![i]!,
        solution[2]![i]!,
        puzzle[1]![i * 2]!,
        puzzle[3]![i * 2]!,
      ),
    );
    console.log(
      solution[0]![i]!,
      solution[1]![i]!,
      solution[2]![i]!,
      puzzle[1]![i * 2]!,
      puzzle[3]![i * 2]!,
      puzzle[6]![i * 2],
    );
  }

  console.log('solution:', solution);
  return { puzzle, solution };
}

// Solution [[3,8,9],[6,5,2],[1,7,4]]
