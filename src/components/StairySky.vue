<template>
  <div class="sky">
    <div class="main-stars-container">
      <div class="primary-star-container">
        <MainStar :has-shadow="false" />
      </div>
      <div v-if="isSecondaryVisible" class="secondary-star-container">
        <MainStar :has-shadow="false" />
      </div>
    </div>
    <div class="shooting-star-container">
      <div class="shooting-star"></div>
      <div class="star-trail"></div>
    </div>
    <div class="star" v-for="n in starCount" :key="n">
      <div class="star-glow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainStar from '@/components/MainStar.vue';
import { randomFromInterval, round } from '@/helpers/calculations';
import { onMounted, Ref, ref, watch } from 'vue';

const mainStar: Ref<HTMLElement | null> = ref();
const hasAscended = ref(false);
const isSecondaryVisible = ref(false);

const props = defineProps<{ starsOpacity: string }>();

const showAscendedStars = () => {
  if (!(hasAscended.value)) return;

  const stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;

  stars.forEach(star => {
    star.style.opacity = '1';
  });
}

const ascendStars = () => {
  const stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;
  mainStar.value.style.transition = 'opacity 3s';
  mainStar.value.style.opacity = '0';
  hasAscended.value = true;

  stars.forEach(star => {
    const starY = star.getBoundingClientRect().y;
    const starTransition = round((starY / 100) + randomFromInterval(3, 8));

    star.style.transition = `opacity 4s, transform ${starTransition}s`;
    star.classList.add('ascending-star');

    setTimeout(() => {
      star.style.opacity = '0';
      setTimeout(() => {
        star.classList.remove('ascending-star');
      }, 10000);
    }, 20000);
  });
}

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

  setTimeout(() => {
    alternateShootingStarAnimation();
  }, 1500);

  setInterval(alternateShootingStarAnimation, randomFromInterval(30, 60));
}

const showStar = (opacity: string) => {
  const mainStar = document.querySelector('.primary-star-container') as HTMLElement;

  mainStar.style.opacity = opacity;
}

const setupStarStyles = () => {
  mainStar.value = document.querySelector('.primary-star-container');
  const skyElement = document.querySelector('.sky') as HTMLElement;
  const stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;
  const skyHeight = skyElement.clientHeight;
  const skyWidth = skyElement.clientWidth;
  const shootingStar = document.querySelector('.shooting-star-container') as HTMLElement;

  watch(() => props.starsOpacity, (opacity) => {
    const starsList = Array.from(stars);

    shootingStar.style.opacity = opacity;

    for (let i = 0; i < starsList.length; i++) {
      let timeout = i * 10;

      setTimeout(() => {
        starsList[i].style.opacity = opacity;
      }, timeout);
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

const starCount = ref(randomFromInterval(50, 100));

defineExpose({
  showStar: showStar,
  ascendStars: ascendStars,
  setShootingStar: setShootingStar,
  showAscendedStars: showAscendedStars,
});

onMounted(() => {
  setupStarStyles();
});
</script>

<style lang="scss" scoped>
.star {
  position: absolute;
  transition: opacity 4s;
  z-index: 4;

  &.ascending-star {
    transform: translateY(-120vh);
  }

  &.animated-star {
    animation: stars-translate 40s ease-in-out infinite running;
  }
}

.main-stars-container {
  display: flex;
  margin: 60px 20px;
  gap: 52px;
  justify-content: center;
  transition: opacity 20s;

  .primary-star-container {
    opacity: 0;
    transition: 8s;
  }
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
  top: 120vh;
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