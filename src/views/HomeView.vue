<template>
  <div class="home">
    <div class="title">O universo não me acolheu</div>
  </div>
</template>

<script setup lang="ts">
import StairySky from '@/components/StairySky.vue';
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 1.6em;
  }
}
</style>