<template>
  <div class="menu">
    <div class="main-content">
      <div class="title">
        <h3>
          Acabou!
        </h3>
      </div>
      <div class="description">
        <p>Meio óbvio mas esse foi um "remake" do que eu fiz no seu aniversário em 2021, com o código melhor escrito e
          alguns segredos.</p>
        <p>Um desses segredos é que aqui suas escolhas importam, você pode reiniciar a história para tentar conseguir um
          novo final (ou só alguns novos diálogos).</p>
      </div>
      <div @click="didTapReset" class="reset-button">Reiniciar</div>
      <div class="episodes-container">
        <p class="hint">Ou selecione um dos episódios a seguir para continuar a história a partir do ponto que preferir:
        </p>
        <div class="episodes-list">
          <div v-for="episode in episodeLines" @click="didTapEpisode(episode.id)" class="story-episode">
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <div class="star"></div>
            <p>{{ episode.description }}</p>
          </div>
        </div>
      </div>
      <div v-if="hasCode" @click="didTapGoToMemories" class="secret-button">☆</div>
      <div v-else @click="didTapSecretButton" class="secret-button">?</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { lines } from '@/helpers/story_line';
import router from '@/router';
import { useCodeStore } from '@/store/code';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';

const codeStore = useCodeStore();
const { hasCode } = storeToRefs(codeStore);

const emit = defineEmits(['show-password-dialog', 'stars-opacity']);
const storyLineIds = [23, 50, 79, 142]
const episodeLines = computed<IEpisodeLines[]>(() => {
  return storyLineIds.map((storyLineId) => {
    const lineFromStory = lines.filter((line) => line.id == storyLineId)[0];
    const previousLine = lines[lines.indexOf(lineFromStory) - 1];

    return <IEpisodeLines>{ id: storyLineId, description: previousLine.text.replaceAll('#', '') };
  });
});

const didTapSecretButton = () => {
  emit('show-password-dialog');
}

const didTapGoToMemories = () => {
  router.push({ name: '/memories' });
};

const didTapEpisode = (id: number) => {
  router.replace({
    name: '/awakening', params: { initialStoryLineId: id },
  });
}

const didTapReset = () => {
  router.replace('/awakening');
}

onMounted(() => {
  localStorage.setItem('isFirstRun', 'false');

  const episodeStars: NodeListOf<HTMLElement> = document.querySelectorAll('.story-episode .star');

  episodeStars.forEach(starElement => {
    starElement.style.top = `${Math.random() * 60 + Math.random() * 60}px`;
    starElement.style.left = `${Math.random() * 100 + Math.random() * 60}px`;
  });
});

interface IEpisodeLines {
  id: number,
  description: string,
}
</script>

<style lang="scss">
.menu {
  z-index: 10;
  width: 100%;
  min-height: 100vh;
  font-family: $third_font_family;
  background-color: $color_primary;

  .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;

    .title {
      text-transform: uppercase;
      font-family: $secondary_font_family;
    }

    .description {
      padding: 40px;

      p {
        margin: 12px 0;
      }
    }

    .reset-button {
      margin: 12px;
      border: 1px solid $color_white;
      background-color: $color_primary;
      padding: 8px;
      cursor: pointer;
      transition: 0.5s;
      border-radius: 12px;

      &:hover {
        box-shadow: 2px 2px 0px 0px $color_white;
      }
    }


    .secret-button {
      right: 20px;
      bottom: 20px;
      cursor: pointer;
      transition: 0.5s;
      padding: 4px 10px;
      position: absolute;
      border-radius: 12px;
      border: 1px solid $color_white;

      &:hover {
        box-shadow: 2px 2px 0px 0px $color_white;
      }
    }

    .episodes-container {
      .hint {
        margin: 40px;
      }

      .episodes-list {
        gap: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .story-episode {
          position: relative;
          width: 200px;
          height: 80px;
          user-select: none;
          border-radius: 20px;
          padding: 8px;
          border: 1px solid rgba(255, 255, 255, 0.266);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          background-color: $color_full_black;
          transition: 0.5s;
          overflow: hidden;

          &:hover {
            cursor: pointer;
            border: 1px solid white;
          }

          .star {
            position: absolute;
            width: 1px;
            height: 1px;
            background-color: white;
          }

          p {
            font-size: 8pt;
          }
        }
      }
    }
  }
}
</style>