<template>
  <div class="square" autofocus="">
    <p>{{ symbol }}</p>
    <!-- <slot name="element"></slot> -->
  </div>
</template>

<script setup lang="ts">
defineProps(['symbol']);
</script>
