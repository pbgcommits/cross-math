<template>
  <input class="square" :value="props.userInput" @input.prevent="emit('update', $event)" />
</template>

<script setup lang="ts">
import './styles.css';

const props = defineProps<{ userInput: string }>();
const emit = defineEmits<{ update: [event: Event] }>();

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
