<script setup lang="ts">
import { ref } from 'vue';
import CrossMathGrid from './components/CrossMathGrid.vue';
import { getDailyGame, getDaysSinceLaunch, getRandomGame } from './data';
const won = ref(false);
const victoryScreenVisible = ref(false);
const userInputGrid = [
  [ref(''), ref(''), ref('')],
  [ref(''), ref(''), ref('')],
  [ref(''), ref(''), ref('')],
];
const puzzle = ref(getDailyGame().puzzle);
function newGame() {
  puzzle.value = getRandomGame().puzzle;
  resetPuzzle();
}
function dailyGame() {
  puzzle.value = getDailyGame().puzzle;
  resetPuzzle();
}
function resetPuzzle() {
  won.value = false;
  for (const row of userInputGrid) {
    for (const col of row) {
      col.value = '';
    }
  }
}
const day = getDaysSinceLaunch() + 1;
</script>

<template>
  <head> </head>
  <v-app>
    <header>
      <div>
        <h1 style="padding-right: 10px">CrossMath #{{ day }}</h1>
      </div>
      <VSpacer></VSpacer>
      <div>
        <VToolbar>
          <VBtn @click="newGame">New game </VBtn>
          <VBtn @click="dailyGame">Daily game</VBtn>
          <VBtn v-if="won" @click="victoryScreenVisible = true">View results</VBtn>
        </VToolbar>
      </div>
      <VDialog v-model="victoryScreenVisible">
        <v-card
          title="You won!"
          style="min-width: 300px; max-width: 400px; align-items: center; align-self: center"
        >
          <v-card-text> </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Close" @click="victoryScreenVisible = false"></v-btn>
          </v-card-actions>
        </v-card>
      </VDialog>
    </header>
    <main>
      <div class="d-flex justify-center align-center fill-height">
        <CrossMathGrid
          v-model:won="won"
          v-model:victory-screen-visible="victoryScreenVisible"
          v-model:user-input-grid="userInputGrid"
          :puzzle="puzzle"
        />
      </div>
    </main>
    <v-footer>Made by Patrick Barton Grace</v-footer>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
