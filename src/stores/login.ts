// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('guid', {
  state: () => ({ userToken: '' }),
  getters: {
    
  },
  actions: {
    logout() {
      this.$reset
    }
  },
})