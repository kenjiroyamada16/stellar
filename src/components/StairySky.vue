<template>
  <div class="sky">
    <div class="main-star-container">
      <MainStar :has-shadow="false" />
    </div>
    <div class="shooting-star-container">
      <div class="shooting-star"></div>
      <div class="star-trail"></div>
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

const setShootingStar = () => {
  const shootingStar = document.querySelector('.shooting-star-container') as HTMLElement;
  const shootingStarTrail = document.querySelector('.star-trail') as HTMLElement

  const alternateShootingStarAnimation = () => {
    shootingStar.classList.add('animated');
    shootingStarTrail.classList.add('animated');
    setTimeout(() => {
      shootingStar.classList.remove('animated');
      shootingStarTrail.classList.remove('animated');
    }, 5000);
  }

  alternateShootingStarAnimation();

  setInterval(alternateShootingStarAnimation, randomFromInterval(30, 60));
}

const showStar = () => {
  const mainStar = document.querySelector('.main-star-container') as HTMLElement;

  mainStar.style.opacity = '1';
}

const setupStarStyles = () => {
  const skyElement = document.querySelector('.sky') as HTMLElement;
  const stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;
  const skyHeight = skyElement.clientHeight;
  const skyWidth = skyElement.clientWidth;

  watch(() => props.starsOpacity, (opacity) => {
    let starsList = Array.from(stars);
    for (let i = 0; i < starsList.length; i++) {
      setTimeout(() => {
        starsList[i].style.opacity = opacity;
      }, i * 100);
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
  setShootingStar: setShootingStar,
});

onMounted(() => {

  setupStarStyles();
});
</script>

<style lang="scss" scoped>
.star {
  position: absolute;
  transition: opacity 4s;
  z-index: 2;
}

.main-star-container {
  left: 46%;
  top: 10%;
  opacity: 0;
  transition: opacity 20s;
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

.shooting-star-container {
  opacity: 0;
  position: absolute;
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  z-index: 5;
  transform: rotateZ(-25deg);

  &.animated {
    animation: shooting-star-right-1 5s ease-in;
  }

  .shooting-star {
    width: 4px;
    height: 4px;
    background-color: $color_white;
    border-radius: 100%;
    animation: star-pulse 8s ease-in-out infinite;
  }

  .star-trail {
    width: 40px;
    height: 1px;
    background-color: #ffffff5e;

    &.animated {
      animation: star-trail 8s ease-in;
    }
  }
}
</style>