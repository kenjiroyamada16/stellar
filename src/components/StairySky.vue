<template>
  <div class="sky">
    <div class="main-star-container">
      <MainStar :has-shadow="false"/>
    </div>
    <div class="star animated-star" v-for="n in starCount" :key="n">
      <div class="star-glow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainStar from '@/components/MainStar.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{ starsOpacity: string }>();

const showStar = () => {
  const mainStar = document.querySelector('.main-star') as HTMLElement;

  mainStar.style.opacity = '1';
}

const setupStarStyles = () => {
  const skyElement = document.querySelector('.sky') as HTMLElement;
  const stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;
  const skyHeight = skyElement.clientHeight;
  const skyWidth = skyElement.clientWidth;

  watch(() => props.starsOpacity, (opacity) => {
    for (let star of Array.from(stars)) {
      star.style.opacity = opacity;
    }
  });

  stars.forEach((star: HTMLElement, i: number) => {
    const starGlow = star.querySelector('.star-glow') as HTMLElement;
    const size = randomFromInterval(1, 3) + 1;
    const x = randomFromInterval(i, skyWidth - i);
    const y = randomFromInterval(i, skyHeight - i);

    starGlow.style.animation = `star-pulse ${(i * 0.3) + randomFromInterval(5, 10)}s ease-in-out infinite`;
    starGlow.style.height = `${size}px`;
    starGlow.style.width = `${size}px`;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  });
}

const randomFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const starCount = ref(randomFromInterval(50, 100));

defineExpose({
  showStar: showStar,
});

onMounted(() => {
  setupStarStyles();
});
</script>

<style lang="scss" scoped>
.star {
  opacity: 0;
  position: absolute;
  transition: opacity 4s;
  z-index: 2;
}

.main-star-container {
  left: 46%;
  top: 10%;
  position: absolute;
}

.animated-star {
  animation: stars-translate 40s ease-in-out infinite running;
}

.star-glow {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 100%;
}

.sky {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: $color_full_black;
  position: relative;
}
</style>