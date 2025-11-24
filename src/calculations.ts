import type { Ref } from 'vue';

export function increment(original: number, increment: number, operator: string): number {
  switch (operator) {
    case '+':
      return original + increment;
    case '-':
      return original - increment;
    case 'x':
      return original * increment;
    case '/':
      return original / increment;
    default:
      return original;
  }
}

export function combine(var0: number, var1: number, operator: string): number {
  switch (operator) {
    case '+':
      return var0 + var1;
    case '-':
      return var0 - var1;
    case 'x':
      return var0 * var1;
    case '/':
      return var0 / var1;
    default:
      return 0;
  }
}

export function getCalculation(
  var0: number,
  var1: number,
  var2: number,
  op1: string,
  op2: string,
): number {
  let result;
  if ((op2 == 'x' && op1 != '/') || (op2 == '/' && (op1 == '+' || op1 == '-'))) {
    result = combine(var1, var2, op2);
    result = increment(var0, result, op1);
  } else {
    result = combine(var0, var1, op1);
    result = increment(result, var2, op2);
  }
  return result;
}

export function correctCalculations(userInputGrid: Ref<string>[][], puzzle: string[][]): boolean {
  for (let i = 0; i < 3; i++) {
    // Check row i
    let var0 = parseInt(userInputGrid[i]![0]!.value);
    let var1 = parseInt(userInputGrid[i]![1]!.value);
    let var2 = parseInt(userInputGrid[i]![2]!.value);
    let operator1 = puzzle[i * 2]![1]!;
    let operator2 = puzzle[i * 2]![3]!;
    let correctResult = parseInt(puzzle[i * 2]![6]!);
    if (getCalculation(var0, var1, var2, operator1, operator2) != correctResult) {
      return false;
    }
    // Check col i
    var0 = parseInt(userInputGrid[0]![i]!.value);
    var1 = parseInt(userInputGrid[1]![i]!.value);
    var2 = parseInt(userInputGrid[2]![i]!.value);
    operator1 = puzzle[1]![i * 2]!;
    operator2 = puzzle[3]![i * 2]!;
    correctResult = parseInt(puzzle[6]![i * 2]!);
    if (getCalculation(var0, var1, var2, operator1, operator2) != correctResult) {
      return false;
    }
  }
  return true;
}

export function noRepeatedNumbers(userInputGrid: Ref<string>[][]): boolean {
  let prev = userInputGrid[0]![0]!.value;
  if (prev == '') return false;
  for (let i = 1; i < 9; i++) {
    const next = userInputGrid[Math.floor(i / 3)]![i % 3]!.value;
    if (next == prev || next == '') return false;
    prev = next;
  }
  return true;
}
