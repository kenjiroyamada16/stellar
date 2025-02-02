import { RemoteConfigEnum } from "@/helpers/remote_config_enum";
import { getStringFromRemoteConfig } from "@/plugins/firebase";
import { defineStore } from "pinia";

const codeStorageKey = 'secret_code';

export const useCodeStore = defineStore({
  id: 'code',
  persist: true,
  state: (): ICodeStore => ({
    code: '',
    fetchedCode: '',
  }),
  getters: {
    hasCode: (state) => state.code,
    getFetchedCode: (state) => state.fetchedCode,
    isCodeValid: (state) => state.code == state.fetchedCode,
  },
  actions: {
    saveCode(code: string) {
      localStorage.setItem(codeStorageKey, code);
    },
    fetchSavedCode() {
      const savedCode = localStorage.getItem(codeStorageKey);
      this.$patch({ code: savedCode });
    },
    async fetchSecretCode() {
      const fetchedCode = await getStringFromRemoteConfig(RemoteConfigEnum.secretCode);
      this.$patch({ fetchedCode: fetchedCode })
    }
  }
})

export interface ICodeStore {
  code: string,
  fetchedCode: string,
}