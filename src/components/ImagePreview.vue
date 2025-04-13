<template>
  <v-dialog theme="dark" :close-on-back="true" v-model="showPreview" max-width="800">
    <img :src="imageUrl">
  </v-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const imageUrl = ref('')
  const showPreview = ref(false);

  const setShowPreview = (show: boolean, image: string) => {
    showPreview.value = show;
    imageUrl.value = image;
    console.log('misera')
  }

  defineExpose({
    setShowPreview,
  });
</script>

<style lang="scss" scoped>
  img {
    object-fit: contain;
  }
</style>