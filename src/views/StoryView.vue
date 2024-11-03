<template>
  <div class="home">
    <div ref="himImageContainer" class="him-image-container animated">
      <div ref="himImageTop" class="him-image-top"></div>
      <div ref="himImageBottom" class="him-image-bottom"></div>
    </div>
    <div class="background-sound">
      <audio id="background-sound" loop></audio>
    </div>
    <div class="home-container">
      <div class="title-container tilting">
        <span class="story-title"></span>
      </div>
      <div v-if="isInput" class="user-input">
        <input v-model="starName" type="text" @keypress="submitName" />
      </div>
      <div class="content-container">
        <div class="talker-label">?</div>
        <span class="story-text"></span>
        <div class="talker-image">
          <MainStar v-if="isStar" :has-shadow="true" />
        </div>
      </div>
      <div class="buttons-container">
        <button @click="didTapFirstChoice" class="first-choice" v-if="currentStoryLine?.firstOption"></button>
        <button @click="didTapSecondChoice" class="second-choice" v-if="currentStoryLine?.secondOption"></button>
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
    <v-dialog v-if="!isFirstRun && currentLineId <= 2 && currentLineId != -1" max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <div class="menu-button" v-bind="activatorProps">三</div>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card theme="dark" title="Ir para o menu?">
          <v-card-text>
            Se essa opção apareceu para você, é porque você já jogou essa história. Mas você pode jogá-la novamente se
            quiser.
          </v-card-text>

          <v-spacer></v-spacer>

          <v-card-actions>
            <div @click="goToMenu" class="dialog-button">Ir para o menu</div>
            <div @click="isActive.value = false" class="dialog-button">Fechar</div>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script setup lang="ts" scoped>
  import mainFavIcon from '/favicon.ico'
  import heImage from '@/assets/images/he-black.png';
  import footsStepsSound from '@/assets/audio/footsteps-dirt.mp3';
  import MainStar from '@/components/MainStar.vue';
  import { lines } from '@/helpers/story_line';
  import { handwriteText } from '@/helpers/text_constructor';
  import { onMounted, ref, Ref, watch } from 'vue';
  import { LineKinds, IStoryLine } from '@/interfaces/story_line';
  import { nullableBool, nullableNumber } from '@/helpers/nullable_extension';
  import router from '@/router';
  import { nameVerifier } from '@/helpers/name_verifier';
  import stringToBool from '@/helpers/local_storage_parser';

  const emit = defineEmits(['stars-opacity', 'show-main-star', 'setup-shooting-star', 'ascend-stars']);

  const starName = ref('');
  const isStar = ref(false);
  const isInput = ref(false);
  const isWriting = ref(false);
  const isFirstRun = ref(true);
  const currentLineId = ref(1);
  const soundIsPlaying = ref(false);
  const himImageTop: Ref<HTMLElement> = ref();
  const himImageBottom: Ref<HTMLElement> = ref();
  const himImageContainer: Ref<HTMLElement> = ref();
  const tip: Ref<HTMLElement | null> = ref(null);
  const title: Ref<HTMLElement | null> = ref(null);
  const content: Ref<HTMLElement | null> = ref(null);
  const talkerLabel: Ref<HTMLElement | null> = ref(null);
  const tipContainer: Ref<HTMLElement | null> = ref(null);
  const currentStoryLine: Ref<IStoryLine | null> = ref(null);
  const backgroundSound: Ref<HTMLAudioElement | null> = ref(null);

  const storyLines: Ref<IStoryLine[] | null> = ref(null);

  const submitName = (event: KeyboardEvent) => {
    if (event.code != 'Enter' || starName.value.length < 4) return;

    isInput.value = false;

    var nextLineId = currentStoryLine.value.secondOptionLineId;

    if (nameVerifier(starName.value.toLowerCase())) {
      nextLineId = currentStoryLine.value.firstOptionLineId;
    }

    handleStoryLine(nextLineId);
  }

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
    const currentLine = storyLines.value.find(line => line.id == lineId);

    currentStoryLine.value = currentLine;

    if (!currentLine) return;

    checkEnding(currentLine.id);

    // MARK: - Specific Actions
    if (currentLine.id >= 2) {
      tip.value.textContent = '';
    }

    if (currentLine.id >= 14 && currentLine.id <= 17) {
      const opacity = `${1 - (currentLine.id - 14) / 3}`
      emit('stars-opacity', opacity);
    }

    if (currentLine.id == 17) {
      setTimeout(() => {
        emit('show-main-star', '1');
      }, 6000);
    };

    if (currentLine.id >= 19) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      link.href = mainFavIcon;
    };

    if (currentLine.id >= 30 && currentLine.id < 34 && !soundIsPlaying.value) {
      backgroundSound.value.play();
      soundIsPlaying.value = true;
      const opacity = `${(currentLine.id - 30) / 3}`
      emit('stars-opacity', opacity);
    }

    if (currentLine.id == 34 && soundIsPlaying.value) {
      backgroundSound.value.pause();
      soundIsPlaying.value = false;
      emit('setup-shooting-star');
    }

    if (currentLine.id == 61) {
      himImageContainer.value.style.opacity = '1';
      title.value.style.color = '#FFFFFF';
    }

    if (currentLine.id == 66) {
      title.value.style.color = '#21247b';
    }

    if (currentLine.id == 72) emit('stars-opacity', '0');

    if (currentLine.id == 79) himImageContainer.value.style.opacity = '1';

    if (currentLine.id == 83) {
      setTimeout(() => {
        himImageContainer.value.style.backgroundImage = 'radial-gradient(closest-side, #eaeaea69, #010100)';
        himImageTop.value.style.backgroundPositionX = '20px';
        himImageBottom.value.style.backgroundPositionX = '-20px';
        himImageTop.value.style.margin = '8px 0';
        himImageBottom.value.style.margin = '8px 0';
        himImageTop.value.style.transform = 'rotateZ(4deg)';
        himImageBottom.value.style.transform = 'rotateZ(4deg)';
        setTimeout(() => {
          himImageContainer.value.style.animationPlayState = 'paused';
          himImageContainer.value.style.opacity = '0.5';
          setTimeout(() => {
            himImageContainer.value.style.opacity = '0';
          }, 2500);
        }, 2500);
      }, 2000);
    }

    if (currentLine.id == 85 || currentLine.id == 160) {
      emit('ascend-stars');
    }

    if (currentLine.id == 91) {
      setTimeout(() => {
        emit('show-main-star', '1');
      }, 900);
    }

    if (currentLine.id == 92) {
      emit('stars-opacity', '1');
    }

    if (currentLine.id == 147) {
      contentContainer.style.transition = 'opacity 20s';
      setTimeout(() => {
        contentContainer.style.opacity = '0';
      }, 2000);
    }

    if (currentLine.id == 149) {
      contentContainer.style.transition = 'opacity 0.3s';
    }

    if (currentLine.id == 161) {
      setTimeout(() => {
        emit('show-main-star', '1');
      }, 900);
    }

    if (currentLine.id == 180) {
      himImageContainer.value.style.opacity = '0';
      handleStoryLine(61);
    }
    // MARK: - Specific Actions - end

    setIsStar(currentLine);

    content.value.style.textAlign = 'justify';

    contentContainer.classList.remove('tilting');
    if (nullableBool(currentLine.tilting)) contentContainer.classList.add('tilting');

    contentContainer.style.textAlign = 'left';

    if (nullableBool(currentLine.isHe)) {
      title.value.style.color = '#21247b';
      title.value.style.fontFamily = 'TiltNeon-Regular';
      titleContainer.classList.add('tilting');
    } else {
      title.value.style.color = '#FFFFFF';
      title.value.style.fontFamily = 'Montserrat-Light';
      titleContainer.classList.remove('tilting');
    }

    if (currentLine.id != 147 && currentLine.id != 148) {
      handleLineKind(currentLine);
    } else {
      writeText(currentLine, content.value);
    }

    currentLineId.value = currentLine.nextLineId;
  }

  const handleLineKind = (currentLine: IStoryLine) => {
    const titleContainer = document.querySelector('.title-container') as HTMLElement;
    const contentContainer = document.querySelector('.content-container') as HTMLElement;

    switch (currentLine.kind) {
      case LineKinds.line:
        titleContainer.style.opacity = '0';
        contentContainer.style.opacity = '1';
        writeText(currentLine, content.value);
        break;
      case LineKinds.title:
        contentContainer.style.opacity = '0';
        titleContainer.style.opacity = '1';
        writeText(currentLine, title.value);
        break;
      case LineKinds.input:
        titleContainer.style.opacity = '0';
        contentContainer.style.opacity = '0';
        isInput.value = true;
        isWriting.value = true;
        break;
      case LineKinds.none:
        title.value.textContent = '';
        content.value.textContent = '';
        contentContainer.style.opacity = '0';
        titleContainer.style.opacity = '0';
        isWriting.value = true;
        setTimeout(() => {
          handleStoryLine(currentLine.nextLineId);
        }, nullableNumber(currentLine.timeout));
        break;
      case LineKinds.narrative:
        titleContainer.style.opacity = '0';
        content.value.style.textAlign = 'center';
        talkerLabel.value.textContent = '';
        contentContainer.style.opacity = '1';
        writeText(currentLine, content.value);
        break;
    }
  }

  const setIsStar = (currentLine: IStoryLine) => {
    const talker = talkerLabel.value;

    isStar.value = false;

    if (currentLine.talker != null) {
      talker.textContent = currentLine.talker.replace('star_name', starName.value);
      isStar.value = currentLine.talker == 'Estrela' || talker.textContent == starName.value
    }
  }

  const writeText = (
    currentLine: IStoryLine, element: HTMLElement,
  ) => {
    isWriting.value = true;

    handwriteText(currentLine.text, element, true, starName.value).then((autoContinue) => {
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
    himImageTop.value.style.backgroundImage = `url(${heImage})`;
    himImageBottom.value.style.backgroundImage = `url(${heImage})`;

    setIsFirstRun();

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

  const setIsFirstRun = () => {
    const firstRun = localStorage.getItem('isFirstRun');

    if (firstRun != null) {
      isFirstRun.value = stringToBool(firstRun);
      return;
    }

    localStorage.setItem('isFirstRun', 'true');
    isFirstRun.value = true;
  }

  const checkEnding = (currentLineId: number) => {
    if (currentLineId == 106 || currentLineId == 168) {
      isWriting.value = true;
      emit('stars-opacity', '1');

      const home = document.querySelector('.home') as HTMLElement;

      setTimeout(() => {
        home.style.backgroundColor = '#FFFFFF';
        setTimeout(() => {
          goToMenu();

          setTimeout(() => {
            emit('show-main-star', '0');
          }, 2000);
        }, 5500);
      }, 8000);
    }
  }

  const goToMenu = () => {
    isWriting.value = true;
    router.replace('/end');
  }
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    z-index: 2;
    transition: background-color 5s;
    justify-content: space-evenly;
    background-position-y: 600px;
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
    user-select: none;

    .key-tip {
      font-family: $third_font_family;
    }

    .tip-container {
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: opacity 0.5s;
    }

    .him-image-container {
      opacity: 0;
      transition: opacity 3s;
      z-index: -1;
      position: absolute;
      display: flex;
      flex-direction: column;
      background-image: radial-gradient(closest-side, #574ffe17, $color_full_black);

      &.animated {
        animation: tilt 0.5s infinite;
      }

      .him-image-top {
        width: 320px;
        height: 40px;
        background-size: cover;
        transition: background-position 10s margin 10s transform 10s;
        background-position-y: 120px;
      }

      .him-image-bottom {
        width: 320px;
        height: 40px;
        background-size: cover;
        transition: background-position 10s margin 10s transform 10s;
        background-position-y: 80px;
      }
    }

    .title-container {
      font-size: 1.6em;
      text-align: center;

      & span {
        color: #21247b;
      }

      &.tilting {
        animation: tilt 0.3s infinite;
      }
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
      border-radius: 4px;
      padding: 12px 32px;
      border: 1px solid #FFFFFF76;

      &.tilting {
        animation: tilt 0.3s infinite;
      }
    }

    .user-input input {
      padding: 12px 20px;
      outline: none;
      border-radius: 12px;
      border: none;
      animation: inputShadow 6s linear infinite;
      background-color: $color_full_black;
      transition: 1s;

      &:focus {
        animation: inputShadow 3s linear infinite;
      }
    }

    @keyframes inputShadow {

      0%,
      100% {
        box-shadow: -2px -1px #FFFFFF76;
      }

      25% {
        box-shadow: 2px -2px #FFFFFF76;
      }

      50% {
        box-shadow: 1px 2px #FFFFFF76;
      }

      75% {
        box-shadow: -1px 2px #FFFFFF76;
      }
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
        z-index: 5;
        flex-grow: 1;
        padding: 12px;
        cursor: pointer;
        transition: 0.5s;
        margin: 20px 12px;
        border-radius: 10px;
        box-shadow: 4px 4px 0px 1px #FFFFFF;
        background-color: #080808;
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

  .menu-button {
    position: absolute;
    right: 20px;
    bottom: 20px;
    border: 1px solid $color_white;
    border-radius: 12px;
    padding: 6px 8px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      box-shadow: 2px 2px 0px $color_white;
    }
  }

  .dialog-button {
    border: 1px solid $color_white;
    border-radius: 12px;
    padding: 6px 8px;
    transition: 0.3s;
    cursor: pointer;
    margin: 0px 12px;

    &:hover {
      box-shadow: 2px 2px 0px $color_white;
    }
  }
</style>