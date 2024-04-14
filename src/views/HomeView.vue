<template>
  <div class="home">
    <div class="home-container">
      <div class="title-container">
        <span class="story-title"></span>
      </div>
      <div class="content-container">
        <div class="talker-label">?</div>
        <span class="story-text"></span>
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
import { lines } from '@/helpers/story_line';
import { handwriteText } from '@/helpers/text_constructor';
import { onMounted, ref, Ref, watch } from 'vue';
import { LineKinds, IStoryLine } from '@/interfaces/story_line';

const currentLineId = ref(1);
const isWriting = ref(false);
const title: Ref<HTMLElement | null> = ref(null);
const content: Ref<HTMLElement | null> = ref(null);
const tip: Ref<HTMLElement | null> = ref(null);
const tipContainer: Ref<HTMLElement | null> = ref(null);

const storyLines: Ref<IStoryLine[] | null> = ref(null);

const handleStoryLine = (lineId: number) => {
  const titleContainer = document.querySelector('.title-container') as HTMLElement;
  const contentContainer = document.querySelector('.content-container') as HTMLElement;
  const currentLine = lines.find(line => line.id == lineId);

  if (!currentLine) return;

  if (currentLine.id == 2) {
    tip.value.textContent = '';
  }

  switch (currentLine.kind) {
    case LineKinds.line:
      contentContainer.style.opacity = '1';
      titleContainer.style.opacity = '0';
      writeText(currentLine.text, content.value);
      break;
    case LineKinds.title:
      contentContainer.style.opacity = '0';
      titleContainer.style.opacity = '1';
      writeText(currentLine.text, title.value);
      break;
  }

  currentLineId.value = currentLine.nextLineId;
}

const writeText = (text: string, element: HTMLElement) => {
  isWriting.value = true;

  handwriteText(text, element).then(() => {
    const titleContainer = document.querySelector('.title-container') as HTMLElement;

    isWriting.value = false;
  })
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
  title.value = document.querySelector('.story-title') as HTMLElement;
  content.value = document.querySelector('.story-text') as HTMLElement;
  tip.value = document.querySelector('.key-tip') as HTMLElement;
  tipContainer.value = document.querySelector('.tip-container') as HTMLElement;

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
  justify-content: space-evenly;
  align-items: center;

  .key-tip {
    font-family: $third_font_family;
  }

  .tip-container {
    display: flex;
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
  }

  .content-container {
    position: relative;
    transition: opacity 0.3s;
    width: 50%;
    min-height: 100px;
    text-wrap: wrap;
    background-color: #000314ab;
    border-radius: 4px;
    padding: 12px 32px;
    border: 1px solid #FFFFFF76;
  }

  .triangle {
    opacity: 0;
    width: 32px;
    height: 32px;
    margin-left: 20px;
    transform-origin: center;
    transition: opacity 0.2s;
    animation: 1s linear 0s infinite rotate-triangle;
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