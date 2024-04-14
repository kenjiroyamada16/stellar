<template>
  <div class="container">
    <div id="main" class="content">
      <StairySky ref="skyRef" :stars-opacity="starsOpacity" />
      <RouterView @stars-opacity="defineStarsOpacity" @show-main-star="showStar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import StairySky from './components/StairySky.vue';

const skyRef = ref();
const starsOpacity = ref('1');

const showStar = () => {
  skyRef.value.showStar();
}

const defineStarsOpacity = (opacity: string) => {
  starsOpacity.value = opacity;
  console.log(opacity);
}
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
