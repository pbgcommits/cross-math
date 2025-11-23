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
  if (!noRepeatedNumbers()) return false;
  if (!correctCalculations()) return false;
  return true;
}

function correctCalculations(): boolean {
  for (let i = 0; i < 3; i++) {
    grid.forEach((v) => console.log(v));
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
