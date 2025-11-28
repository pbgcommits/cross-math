<template>
  <v-container>
    <div v-for="(row, rowIndex) in puzzle" :key="rowIndex" class="puzzleRow">
      <div v-for="(squareType, colIndex) in row" :key="colIndex">
        <div v-if="squareType == '_'">
          <EditableSquare
            :userInput="userInputGrid![Math.floor(rowIndex / 2)]![Math.floor(colIndex / 2)]!.value"
            @update="
              ($event) => {
                limitText($event);
                userInputGrid![Math.floor(rowIndex / 2)]![Math.floor(colIndex / 2)]!.value = (
                  $event.target as HTMLInputElement
                ).value;
                const isValid = isValidSolution();
                if (isValid) {
                  won = true;
                  victoryScreenVisible = true;
                }
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
import { operators } from '@/data';
import EditableSquare from './EditableSquare.vue';
import FixedSquare from './FixedSquare.vue';
import { correctCalculations, noRepeatedNumbers } from '@/calculations';
import { type Ref } from 'vue';
const props = defineProps<{ puzzle: string[][] }>();
const won = defineModel<boolean>('won', { default: false });
const victoryScreenVisible = defineModel<boolean>('victoryScreenVisible', { default: false });
const userInputGrid = defineModel<Ref<string>[][]>('userInputGrid');

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
  const uig = userInputGrid.value!;
  if (!correctCalculations(uig, props.puzzle)) return false;
  if (!noRepeatedNumbers(uig)) return false;
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
