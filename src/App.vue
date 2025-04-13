<template>
  <div ref="cursor" :class="['custom-cursor', { hidden: !showCursor, active: cursorActive }]"></div>
  <v-app>
    <div class="container">
      <div id="main" class="content">
        <StairySky ref="skyRef" :stars-opacity="starsOpacity" />
        <router-view
          @show-password-dialog="showPasswordDialog"
          @setup-shooting-star="setupShootingStar"
          @stars-opacity="defineStarsOpacity"
          @show-main-star="showStar"
          @ascend-stars="ascendStars" />
      </div>
    </div>

    <PasswordDialog ref="passwordDialog" />
  </v-app>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { RouterView } from 'vue-router';
  import PasswordDialog from './components/PasswordDialog.vue';
  import StairySky from './components/StairySky.vue';

  const skyRef = ref();
  const showCursor = ref(false);
  const cursorActive = ref(false);
  const starsOpacity = ref('1');
  const passwordDialog = ref();
  const cursor = ref<HTMLElement>();

  const showPasswordDialog = () => {
    passwordDialog.value.setShowDialog(true);
  }

  const setupShootingStar = () => {
    skyRef.value.setShootingStar();
    starsOpacity.value = '0.7';
  }

  const showStar = (opacity: string) => {
    skyRef.value.showStar(opacity);
  }

  const defineStarsOpacity = (opacity: string) => {
    starsOpacity.value = opacity;
  }

  const ascendStars = () => {
    skyRef.value.ascendStars();
  }

  onMounted(() => {
    document.addEventListener('mousemove', (e) => {
      if (!cursor.value) return;

      cursor.value.style.left = e.clientX + 'px';
      cursor.value.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursorActive.value = true);
    document.addEventListener('mouseup', () => cursorActive.value = false);
    document.addEventListener('mouseenter', () => showCursor.value = true);
    document.addEventListener('mouseleave', () => showCursor.value = false);
  });
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    height: 100vh;

    .content {
      position: relative;
      flex: 1;
      overflow: none;

      * {
        position: absolute;
      }
    }
  }
</style>
