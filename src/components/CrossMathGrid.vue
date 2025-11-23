<template>
  <v-container>
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="puzzleRow">
      <div v-for="(squareType, colIndex) in row" :key="colIndex">
        <div v-if="squareType == '_'">
          <!--Why might userInput be undefined? (why do we need !)-->
          <EditableSquare
            :userInput="userInputGrid[Math.floor(rowIndex / 2)]![Math.floor(colIndex / 2)]!.value"
            @update="
              ($event) => {
                limitText($event);
                userInputGrid[Math.floor(rowIndex / 2)]![Math.floor(colIndex / 2)]!.value = (
                  $event.target as HTMLInputElement
                ).value;
                won = isValidSolution();
              }
            "
          />
        </div>
        <div v-else-if="!isNaN(parseInt(squareType))">
          <FixedSquare :symbol="squareType" :class="'answer'" />
        </div>
        <div v-else-if="squareType.match(operators)">
          <FixedSquare :symbol="squareType" :class="'empty'" />
        </div>
        <div v-else-if="squareType == ' '">
          <FixedSquare style="background-color: white" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { getData, operators } from '@/data';
import EditableSquare from './EditableSquare.vue';
import FixedSquare from './FixedSquare.vue';
import { ref } from 'vue';
const won = defineModel<boolean>({ default: false });
const { grid } = getData();
const userInputGrid = [
  [ref(''), ref(''), ref('')],
  [ref(''), ref(''), ref('')],
  [ref(''), ref(''), ref('')],
];

function limitText(event: Event) {
  // Only allow a single digit
  const text = event.target as HTMLInputElement;
  const oldDigit = text.value[0] || '';
  if (isNaN(parseInt(text.value))) {
    text.value = text.value.length == 1 ? '' : oldDigit;
    return;
  }
  if (text.value.length > 1) {
    const newDigit = text.value[1] || '';
    text.value = !isNaN(parseInt(newDigit)) ? newDigit : oldDigit;
  }
}

function isValidSolution(): boolean {
  if (!correctCalculations()) return false;
  if (!noRepeatedNumbers()) return false;
  return true;
}

function increment(original: number, increment: number, operator: string): number {
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

function combine(var0: number, var1: number, operator: string): number {
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

function correctCalculations(): boolean {
  for (let i = 0; i < 3; i++) {
    // Check row 0
    let var0 = parseInt(userInputGrid[i]![0]!.value);
    let var1 = parseInt(userInputGrid[i]![1]!.value);
    let var2 = parseInt(userInputGrid[i]![2]!.value);
    let operator1 = grid[i * 2]![1]!;
    let operator2 = grid[i * 2]![3]!;
    let correctResult = parseInt(grid[i * 2]![6]!);
    let userResult = 0;
    if (operator2 == 'x' || (operator2 == '/' && (operator1 == '+' || operator1 == '-'))) {
      userResult = combine(var1, var2, operator2);
      userResult = increment(userResult, var0, operator1);
    } else {
      userResult = combine(var0, var1, operator1);
      userResult = increment(userResult, var2, operator2);
    }
    if (userResult != correctResult) {
      return false;
    }
    // Check col 0
    var0 = parseInt(userInputGrid[0]![i]!.value);
    var1 = parseInt(userInputGrid[1]![i]!.value);
    var2 = parseInt(userInputGrid[2]![i]!.value);
    operator1 = grid[1]![i * 2]!;
    operator2 = grid[3]![i * 2]!;
    correctResult = parseInt(grid[6]![i * 2]!);
    userResult = 0;
    if (operator2 == 'x' || (operator2 == '/' && (operator1 == '+' || operator1 == '-'))) {
      userResult = combine(var1, var2, operator2);
      userResult = increment(userResult, var0, operator1);
    } else {
      userResult = combine(var0, var1, operator1);
      userResult = increment(userResult, var2, operator2);
    }
    if (userResult != correctResult) {
      return false;
    }
  }
  return true;
}

function noRepeatedNumbers(): boolean {
  let prev = userInputGrid[0]![0]!.value;
  if (prev == '') return false;
  for (let i = 1; i < 9; i++) {
    const next = userInputGrid[Math.floor(i / 3)]![i % 3]!.value;
    if (next == prev || next == '') return false;
    prev = next;
  }
  return true;
}
</script>

<style>
.puzzleRow {
  display: grid;
  grid-template-columns: repeat(7, max-content);
  column-gap: 0;
  row-gap: 0;
}
</style>
