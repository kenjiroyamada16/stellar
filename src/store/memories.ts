import ApiService from "@/api/api.service";
import { MemoriesResources } from "@/api/resources/memories";
import { Memory } from "@/interfaces/memory";
import { defineStore } from "pinia";

export const useMemoriesStore = defineStore({
  id: 'memories',
  persist: true,
  state: (): IMemoriesStore => ({
    memories: [],
    isLoading: false,
  }),
  getters: {
    getMemories: (state) => state.memories,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async fetchMemories() {
      this.$patch({ isLoading: true });
      MemoriesResources.fetchMemories().then(response => {
        this.$patch({ memories: response, isLoading: false });
      });
    }
  }
})

export interface IMemoriesStore {
  memories: Memory[],
  isLoading: boolean,
}