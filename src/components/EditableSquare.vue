<template>
  <v-container>
    <input class="square" />
  </v-container>
</template>

<script setup lang="ts">
import './styles.css';

// function limitText() {
//   // Only allow a single digit
//   // const text = event.target as HTMLInputElement;
//   const oldDigit = text.value[0] || '';
//   if (isNaN(parseInt(text.value))) {
//     text.value = text.value.length == 1 ? '' : oldDigit;
//     return;
//   }
//   if (text.value.length > 1) {
//     const newDigit = text.value[1] || '';
//     text.value = !isNaN(parseInt(newDigit)) ? newDigit : oldDigit;
//   }
// }
</script>
