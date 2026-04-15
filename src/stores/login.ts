// https://pinia.vuejs.org/core-concepts/
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('guid', {
  state: () => ({ userToken: '', currentPass: '', first: '', last: '' }),
  persist: true,
  getters: {
    
  },
  actions: {
    logout() {
      this.$reset
    }
  },
})
