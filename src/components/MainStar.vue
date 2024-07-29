<template>
  <div class="main-star animated"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps<{
  hasShadow: boolean,
}>();

onMounted(() => {
  const star = document.querySelector('.main-star.animated') as HTMLElement;

  if (!props.hasShadow && star) {
    star.classList.remove('animated');
  }
});  
</script>

<style lang="scss" scoped>
@keyframes shadow-translate {

  0%,
  100% {
    box-shadow: 3px 3px 5px 1px #ffffff6d;
  }

  25% {
    box-shadow: 3px 0px 3px 1px #ffffff6d;
  }

  50% {
    box-shadow: 0px -3px 3px 1px #ffffff6d;
  }

  75% {
    box-shadow: 3px 0px 4px 1px #ffffff6d;
  }
}

@keyframes shadow-pulse {

  0%,
  100% {
    box-shadow: -2px -8px 8px 4px #ffffff6d, 2px 8px 8px 4px #ffffff6d;
  }

  50% {
    box-shadow: -1px -2px 8px 3px #ffffff48, 1px 2px 8px 3px #ffffff35;
  }
}

.main-star {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 100%;
  width: 100px;
  height: 100px;

  &.animated {
    animation: shadow-translate 15s infinite;
  }

  &::before {
    content: '';
    left: 40%;
    top: 40%;
    position: absolute;
    background: #FFFFFF;
    width: 16px;
    height: 19px;
    animation: shadow-pulse 8s infinite;
    transform: rotate(-45deg) skewX(22.5deg) skewY(22.5deg);
  }

  &::after {
    content: '';
    left: 40%;
    top: 40%;
    position: absolute;
    background: #FFFFFF;
    width: 16px;
    height: 19px;
    animation: shadow-pulse 8s infinite;
    transform: rotate(45deg) skewX(22.5deg) skewY(26.5deg);
  }
}
</style>