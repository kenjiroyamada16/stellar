<template>
  <v-dialog theme="dark" :close-on-back="true" v-model="showDialog" max-width="800">
    <v-card title="Preencha com a senha ultra-secreta">
      <v-spacer></v-spacer>
      <v-otp-input
        v-model="password"
        placeholder="0"
      ></v-otp-input>
      <span v-if="inputHasError" class="input-error">Senha incorreta</span>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const showDialog = ref(false);
  const password = ref('');
  const inputHasError = ref(false);

  const setShowDialog = (show: boolean) => {
    showDialog.value = show;
  }

  watch(password, async (password, _) => {
    // TODO: Adicionar senha certa

    if (password.length < 6) return;

    inputHasError.value = true;
  });

  defineExpose({
    setShowDialog,
  });
</script>

<style scoped lang="scss">
  .v-otp-input :deep(.v-otp-input__field) {
    font-family: $secondary_font_family;
  }

  .input-error {
    text-align: center;
    margin: 24px;
    color: rgb(255, 75, 75);
  }
</style>