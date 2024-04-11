<template>
  <div class="home">
    <div class="container">
      <span v-if="showTitle" class="story-title">O universo não me acolheu</span>
      <div v-if="showContent" class="content">
        <span class="story-text"></span>
      </div>
    </div>
    <span class="key-tip">Pressione Espaço</span>
  </div>
</template>

<script setup lang="ts">
import StairySky from '@/components/StairySky.vue';
import { handwriteText } from '@/helpers/text_constructor';
import { onMounted, ref } from 'vue';

const titleId = ref(0);
const contentId = ref(0);
const showTitle = ref(true);
const showContent = ref(false);
const title = ref(null); 
const text = ref(null); 

onMounted(() => {
  title.value = document.querySelector('.story-title') as HTMLElement;
  text.value = document.querySelector('.story-text') as HTMLElement;

  document.addEventListener('keyup', (event) => {
    if (event.code == 'Space') {
      handwriteText('Oiiiiiiiiii', title.value);
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

  .story-title {
    font-size: 1.6em;
    animation: tilt 0.3s infinite;
  }

  .container {
    margin-top: 64px;
  }
}
</style>