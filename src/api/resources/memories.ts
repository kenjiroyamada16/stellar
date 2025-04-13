import ApiService from "../api.service";

export const MemoriesResources = {
  fetchMemories: () => ApiService.get('memories'),
}