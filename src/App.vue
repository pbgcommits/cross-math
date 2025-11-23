<script setup lang="ts">
import { ref } from 'vue';
import CrossMathGrid from './components/CrossMathGrid.vue';
const won = ref(false);
</script>

<template>
  <v-app>
    <header>
      <h1>CrossMath</h1>
      <VAlert v-if="won">You won!</VAlert>
    </header>
    <main>
      <div class="d-flex justify-center align-center fill-height">
        <CrossMathGrid v-model="won" />
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
