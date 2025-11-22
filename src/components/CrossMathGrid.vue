<template>
  <v-container class="mathGrid">
    <v-row v-for="(row, rowIndex) in grid" :key="rowIndex">
      <v-col v-for="(squareType, colIndex) in row" :key="colIndex" cols="1">
        <div v-if="squareType == '_'">
          <!--Why might userInput be undefined? (why do we need !)-->
          <EditableSquare
            v-model="userInput[Math.floor(rowIndex / 2)]![Math.floor(colIndex / 2)]!.value"
            @input.prevent="checkSolution"
          />
        </div>
        <div v-else-if="!isNaN(parseInt(squareType))">
          <FixedSquare :symbol="squareType" />
        </div>
        <div v-else-if="squareType.match(operators)">
          <FixedSquare :symbol="squareType" />
        </div>
        <div v-else-if="squareType == ' '">
          <FixedSquare style="background-color: white" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getData, operators } from '@/data';
import EditableSquare from './EditableSquare.vue';
import FixedSquare from './FixedSquare.vue';
import { ref } from 'vue';
const { grid } = getData();
const userInput = [
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

function checkSolution(event: Event) {
  limitText(event);
  let g = '[';
  for (const row of userInput) {
    for (const col of row) {
      g += col.value + ',';
    }
    g += ',\n';
  }
  g += ']';
  console.log(g);
}
</script>
