<template>
  <div class="menu">
    <div class="main-content">
      <div class="title">
        <h3>
          Acabou!
        </h3>
      </div>
      <div class="description">
        <p>Meio óbvio mas esse foi um "remake" do que eu fiz no seu aniversário em 2021, com o código melhor escrito e alguns segredos.</p>
        <p>Um desses segredos é que aqui suas escolhas importam, você pode reiniciar a história para tentar conseguir um novo final (ou só alguns novos diálogos).</p>
      </div>
      <div class="reset-option">
        <div @click="didTapReset" class="reset-button">Reiniciar</div>
      </div>
      <div @click="didTapSecretButton" class="secret-button">?</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '@/router';
  import { onMounted } from 'vue';

  const emit = defineEmits(['show-password-dialog', 'stars-opacity']);

  const didTapSecretButton = () => {
    emit('show-password-dialog');
  }

  const didTapReset = () => {
    router.replace('/awakening');
  }

  onMounted(() => {
    localStorage.setItem('isFirstRun', 'false');
  });
</script>

<style lang="scss">
  .menu {
    height: 100vh;
    width: 100%;
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

      .reset-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 24px;

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
    }
  }

</style>