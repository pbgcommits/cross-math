<template>
  <div class="square empty" autofocus="">
    <p>{{ symbol }}</p>
    <!-- <slot name="element"></slot> -->
  </div>
</template>

<script setup lang="ts">
defineProps(['symbol']);
</script>
