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
  import router from '@/router';
  import { useCodeStore } from '@/store/code';
  import { storeToRefs } from 'pinia';
  import { onMounted, ref, watch } from 'vue';

  const codeStore = useCodeStore();
  const { getFetchedCode } = storeToRefs(codeStore);

  const showDialog = ref(false);
  const password = ref('');
  const inputHasError = ref(false);

  const setShowDialog = (show: boolean) => {
    showDialog.value = show;
  }

  watch(password, async (password, _) => {
    inputHasError.value = true;

    if (password.length < 6) return;
    if (getFetchedCode.value != password) return;

    inputHasError.value = false;
    codeStore.saveCode(password);
    setShowDialog(false);
    router.push({ name: '/memories' });
  });

  defineExpose({
    setShowDialog,
  });

  onMounted(() => {
    codeStore.fetchSecretCode();
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