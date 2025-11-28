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
      <h1>CrossMath #{{ day }}</h1>
      <VSpacer></VSpacer>
      <v-btn @click="newGame">New game</v-btn>
      <VSpacer></VSpacer>
      <v-btn v-if="won" @click="victoryScreenVisible = true">View results</v-btn>
      <VDialog v-model="victoryScreenVisible">
        <v-card title="You won!">
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
