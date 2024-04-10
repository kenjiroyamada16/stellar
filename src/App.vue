<template>
  <div class="container">
    <div id="main" class="content">
      <StairySky />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import StairySky from './components/StairySky.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;

  .content {
    position: relative;
    flex: 1;
    overflow: none;

    * {
      position: absolute;
    }
  }
}
</style>
