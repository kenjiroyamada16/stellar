<template>
  <div class="sky">
    <div class="star" v-for="n in starCount">
      <div class="star-glow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const setupStarStyles = () => {
  const skyElement = document.querySelector('.sky');
  const skyHeight = skyElement.clientHeight;
  const skyWidth = skyElement.clientWidth;

  for (let i = 0; i < starCount.value; i++) {
    const star = document.querySelectorAll('.star')[i] as HTMLElement;
    const starGlow = star.children[0] as HTMLElement;
    const size = randomFromInterval(1, 3) + 1;
    const x = randomFromInterval(i, skyWidth - i);
    const y = randomFromInterval(i, skyHeight - i);
    
    starGlow.style.animation = `star-pulse ${(i * 0.3) + randomFromInterval(5, 10)}s ease-in-out infinite running`;
    starGlow.style.height = `${size}px`;
    starGlow.style.width = `${size}px`;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  }
}

const randomFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const starCount = ref(randomFromInterval(50, 100));

onMounted(() => {
  setupStarStyles();
});
</script>

<style lang="scss" scoped>
.star {
  position: absolute;
}

.star-glow {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 100%;
  opacity: 1;
  box-shadow: 0px 0px 4px 2px $color_white;
  animation: pulse 4s ease-in-out infinite running;
}

.sky {
  width: 100%;
  height: 100vh;
  background-color: $color_full_black;
  position: relative;
}
</style>