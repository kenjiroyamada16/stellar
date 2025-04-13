<template>
  <ImagePreview ref="imagePreviewDialog" />
  <div class="memories">
    <MainStar class="main-star" :hasShadow="false" />
    <span class="title">MEMÓRIAS</span>
    <v-progress-circular v-if="isLoading" class="loading" />
    <div v-else class="content">
      <div class="memories-list">
        <div
          class="memory-item"
          v-for="memory in sortedMemories"
          :key="memory.id"
        >
          <div class="memory-date">{{ formatDate(memory.image_date) }}</div>
          <div class="timeline">
            <div class="thumb"></div>
            <div class="track"></div>
          </div>
          <div class="memory-info" @click="showImagePreview(memory.image_url)">
            <img class="memory-image" :src="`http://localhost:3000/${memory.image_url}`"/>
            <div class="memory-title">{{ memory.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ImagePreview from '@/components/ImagePreview.vue';
  import MainStar from '@/components/MainStar.vue';
  import { useMemoriesStore } from '@/store/memories';
  import { storeToRefs } from 'pinia';
  import { computed, onMounted, ref } from 'vue';

  const memoriesStore = useMemoriesStore();
  const { isLoading, memories } = storeToRefs(memoriesStore);

  const imagePreviewDialog = ref();

  const sortedMemories = computed(() => {
    return memories.value.sort((a, b) => {
      return Date.parse(b.image_date) - Date.parse(a.image_date);
    });
  });

  const showImagePreview = (imageUrl: string) => {
    const url = `http://localhost:3000/${imageUrl}`;

    imagePreviewDialog.value.setShowPreview(true, url);
  }

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  onMounted(() => {
    memoriesStore.fetchMemories();
  });
</script>

<style scoped lang="scss">
  .animated-star-parts {
    animation: show-star-parts 7s 2.5s ease-in-out forwards;
  }

  .memories {
    width: 100%;
    background-color: black;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 32px;
    align-items: center;
    position: relative;
    overflow: visible;
    overflow-x: hidden;

    .main-star {
      animation: show-content 3s ease-in-out forwards;
    }

    .title {
      opacity: 0;
      text-align: center;
      animation: show-content 2.5s 4s forwards;
      font-family: $secondary_font_family;
      font-size: 2.5rem;
    }

    .content {
      margin-top: 100px;
      opacity: 0;
      animation: show-content 3s 5.5s forwards;
      width: 100vw;
      height: 100%;

      p {
        text-align: center;
      }

      .memories-list {
        gap: 16px;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;

        .memory-item {
          gap: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;

          &:last-child {
            .timeline {
              height: 0;
            }
          }

          .timeline {
            justify-items: center;
            margin: 0 24px;
            height: 100%;
            transform: translateY(50%);

            .track {
              width: 2px;
              background-color: white;
              height: 100%;
            }

            .thumb {
              width: 20px;
              height: 20px;
              background-color: white;
              border-radius: 50%;
            }
          }

          .memory-info {
            border-radius: 12px;
            padding: 24px 32px;
            transition: 0.5s;

            &:hover {
              background-color: rgb(34, 34, 34);
            }

            .memory-title {
              text-align: center;
            }

            .memory-image {
              width: 320px;
              max-height: 320px;
              object-fit: cover;
              border-radius: 8px;
            }
          }
        }
      }
    }
  }

  @keyframes show-content {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>