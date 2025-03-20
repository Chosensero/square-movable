<script lang="ts" setup>
import SquareComponent from '@/components/SquareComponent.vue'
</script>

<template>
  <div class="app-wrapper">
    <h1 class="title">Потяни меня</h1>
    <SquareComponent />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
}

.title {
  font-family: 'Geist', sans-serif;
  color: var(--color-heading);
  font-size: 24px;

  margin-bottom: 20px;
}
</style>
