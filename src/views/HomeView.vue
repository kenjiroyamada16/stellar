<template>
  <div class="home">
    <div class="background-sound">
      <audio id="background-sound" loop></audio>
    </div>
    <div class="home-container">
      <div class="title-container">
        <span class="story-title"></span>
      </div>
      <div class="content-container">
        <div class="talker-label">?</div>
        <span class="story-text"></span>
        <div class="talker-image">
          <MainStar v-if="isStar" :has-shadow="true" />
        </div>
      </div>
      <div class="buttons-container">
        <button v-on:click="didTapFirstChoice" class="first-choice" v-if="currentStoryLine?.firstOption"></button>
        <button v-on:click="didTapSecondChoice" class="second-choice" v-if="currentStoryLine?.secondOption"></button>
      </div>
    </div>
    <div class="tip-container">
      <span class="key-tip"></span>
      <div class="triangle">
        <svg id="e1MYu4O9vJe1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
          <path
            d="M19.073017,10.549816l270.104942-.978642L148.997043,207.897142L10.265247,10.549816q8.80777.000001,8.80777,0Z"
            transform="translate(.278397 45.659929)" fill="#fff" stroke="#fff" stroke-width="0.6" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" scoped>
import mainFavIcon from '/favicon.ico'
import footsStepsSound from '@/assets/audio/footsteps-dirt.mp3';
import MainStar from '@/components/MainStar.vue';
import { lines } from '@/helpers/story_line';
import { handwriteText } from '@/helpers/text_constructor';
import { onMounted, ref, Ref, watch } from 'vue';
import { LineKinds, IStoryLine } from '@/interfaces/story_line';
import { nullableNumber } from '@/helpers/nullable_extension';

const emit = defineEmits(['stars-opacity', 'show-main-star', 'setup-shooting-star',]);

const isStar = ref(false);
const isWriting = ref(false);
const currentLineId = ref(14);
const soundIsPlaying = ref(false);
const tip: Ref<HTMLElement | null> = ref(null);
const title: Ref<HTMLElement | null> = ref(null);
const content: Ref<HTMLElement | null> = ref(null);
const talkerLabel: Ref<HTMLElement | null> = ref(null);
const tipContainer: Ref<HTMLElement | null> = ref(null);
const currentStoryLine: Ref<IStoryLine | null> = ref(null);
const backgroundSound: Ref<HTMLAudioElement | null> = ref(null);

const storyLines: Ref<IStoryLine[] | null> = ref(null);

const setupButtons = (containerOpacity: string) => {
  const buttonsContainer = document.querySelector('.buttons-container') as HTMLElement;
  const firstButton = document.querySelector('.first-choice') as HTMLElement;
  const secondButton = document.querySelector('.second-choice') as HTMLElement;

  if (firstButton) firstButton.textContent = currentStoryLine.value.firstOption;
  if (secondButton) secondButton.textContent = currentStoryLine.value.secondOption;
  buttonsContainer.style.opacity = containerOpacity;
}

const didTapFirstChoice = () => {
  setupButtons('0');
  title.value.textContent = '';
  content.value.textContent = '';
  handleStoryLine(currentStoryLine.value.firstOptionLineId);
}

const didTapSecondChoice = () => {
  setupButtons('0');
  title.value.textContent = '';
  content.value.textContent = '';
  handleStoryLine(currentStoryLine.value.secondOptionLineId);
}

const handleStoryLine = (lineId: number) => {
  const titleContainer = document.querySelector('.title-container') as HTMLElement;
  const contentContainer = document.querySelector('.content-container') as HTMLElement;
  const currentLine = lines.find(line => line.id == lineId);

  currentStoryLine.value = currentLine;

  if (!currentLine) return;

  /// Specific Actions
  if (currentLine.id >= 2) {
    tip.value.textContent = '';
  }

  if (currentLine.id >= 14 && currentLine.id <= 17) {
    const opacity = `${1 - (currentLine.id - 14) / 3}`
    emit('stars-opacity', opacity);
  }

  if (currentLine.id == 17) {
    setTimeout(() => {
      emit('show-main-star')
    }, 3000);
  };

  if (currentLine.id >= 19) {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    link.href = mainFavIcon;
  };

  if (currentLine.id >= 30 && currentLine.id < 34 && !soundIsPlaying.value) {
      backgroundSound.value.play();
      soundIsPlaying.value = true;
  }

  if (currentLine.id == 34 && soundIsPlaying.value) {
    backgroundSound.value.pause();
    soundIsPlaying.value = false;
    emit('setup-shooting-star');
  } 
  /// Specific Actions - end

  if (currentLine.talker) talkerLabel.value.textContent = currentLine.talker;
  content.value.style.textAlign = 'left';

  switch (currentLine.kind) {
    case LineKinds.line:
      title.value.textContent = '';
      titleContainer.style.opacity = '0';
      contentContainer.style.opacity = '1';
      writeText(currentLine, content.value);
      break;
    case LineKinds.title:
      content.value.textContent = '';
      contentContainer.style.opacity = '0';
      titleContainer.style.opacity = '1';
      writeText(currentLine, title.value);
      break;
    case LineKinds.none:
      title.value.textContent = '';
      content.value.textContent = '';
      contentContainer.style.opacity = '0';
      titleContainer.style.opacity = '0';
      break;
    case LineKinds.narrative:
      titleContainer.style.opacity = '0';
      content.value.style.textAlign = 'center';
      talkerLabel.value.textContent = '';
      contentContainer.style.opacity = '1';
      writeText(currentLine, content.value);
  }

  currentLineId.value = currentLine.nextLineId;
}

const writeText = (
  currentLine: IStoryLine, element: HTMLElement,
) => {
  isWriting.value = true;

  handwriteText(currentLine.text, element).then((autoContinue) => {
    setTimeout(() => {
      if (currentLine.firstOption && currentLine.secondOption) {
        setupButtons('1');
        return;
      }

      if (autoContinue) {
        handleStoryLine(currentLineId.value);
      } else {
        isWriting.value = false;
      }

    }, nullableNumber(currentLine.endDelay));
  });
}

watch(isWriting, async (isWriting, _) => {
  if (isWriting) {
    tipContainer.value.style.opacity = '0';
  } else {
    setTimeout(() => {
      tipContainer.value.style.opacity = '1';
    }, 700);
  }
});

onMounted(() => {
  tip.value = document.querySelector('.key-tip') as HTMLElement;
  title.value = document.querySelector('.story-title') as HTMLElement;
  content.value = document.querySelector('.story-text') as HTMLElement;
  talkerLabel.value = document.querySelector('.talker-label') as HTMLElement;
  tipContainer.value = document.querySelector('.tip-container') as HTMLElement;
  backgroundSound.value = document.querySelector('#background-sound') as HTMLAudioElement;

  backgroundSound.value.src = footsStepsSound;

  storyLines.value = lines;

  setTimeout(() => {
    handleStoryLine(currentLineId.value);
    setTimeout(() => {
      tip.value.textContent = 'Pressione Espaço';
      const triangle = document.querySelector('.triangle') as HTMLElement;
      triangle.style.opacity = '1';
    }, 2000);
  }, 2000);

  document.addEventListener('keyup', (event) => {
    if (event.code != 'Space') return;

    if (!isWriting.value) {
      handleStoryLine(currentLineId.value);
    }
  })
});


</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  z-index: 2;
  justify-content: space-evenly;
  background-position-y: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;

  .key-tip {
    font-family: $third_font_family;
  }

  .tip-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    transition: opacity 0.5s;
  }

  .title-container {
    font-size: 1.6em;
    text-align: center;
    animation: tilt 0.3s infinite;
  }

  .talker-label {
    position: absolute;
    left: -12px;
    top: -20px;
    background-color: $color_full_black;
    padding: 8px 12px;
    z-index: 0;
  }

  .talker-image {
    position: absolute;
    right: -20px;
    top: -60px;
  }

  .home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 64px;
    width: 80%;
  }

  span {
    text-wrap: pretty !important;
    word-wrap: break-word;
    word-break: normal;
    width: 100%;
    white-space: pre;
  }

  .content-container {
    opacity: 0;
    position: relative;
    display: flex;
    transition: opacity 0.3s;
    width: 70%;
    min-height: 100px;
    text-wrap: wrap;
    background-color: #000314ab;
    border-radius: 4px;
    padding: 12px 32px;
    border: 1px solid #FFFFFF76;
  }

  .triangle {
    display: flex;
    opacity: 0;
    width: 16px;
    height: 24px;
    margin-left: 20px;
    transform-origin: center;
    transition: opacity 0.2s;
    animation: 1s linear 0s infinite rotate-triangle;
  }

  .buttons-container {
    opacity: 0;
    width: 70%;
    transition: opacity 1s;
    display: flex;
    padding: 0px 8px;

    button {
      flex: 1;
      z-index: 3;
      flex-grow: 1;
      padding: 12px;
      cursor: pointer;
      transition: 0.5s;
      margin: 20px 12px;
      border-radius: 10px;
      box-shadow: 4px 4px 0px 1px #FFFFFF;
      background-color: #111111ba;
      border: 1px solid #FFFFFF76;

      &:hover {
        box-shadow: none;
        background-color: #111111;
        border: 1px solid #FFFFFF;
      }
    }
  }

  @keyframes rotate-triangle {
    0% {
      transform: rotateY(0deg);
    }

    100% {
      transform: rotateY(180deg);
    }
  }
}
</style>