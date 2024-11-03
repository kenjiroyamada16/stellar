<template>
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

    <PasswordDialog ref="passwordDialog"/>
  </v-app>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import PasswordDialog from './components/PasswordDialog.vue';
  import StairySky from './components/StairySky.vue';

  const skyRef = ref();
  const starsOpacity = ref('1');
  const passwordDialog = ref();

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
