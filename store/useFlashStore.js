import {defineStore} from 'pinia'

export const useFlashStore = defineStore('flash', {
  state: () => ({
    messages: [],
  }),
  getters: {
    getMessages() {
      return this.messages
    }
  },
  actions: {
    getNewId() {
      const ids = this.messages.map(message => message.id)
      const max = ids.length === 0 ? undefined : Math.max(...ids)
      return max === undefined ? 0 : max + 1
    },
    findMessage(id) {
      return this.messages.find(message => message.id === id)
    },
    removeMessage(id) {
      this.messages = this.messages.filter(message => message.id !== id)
    },
    addMessage(message) {
      this.messages.push({
        id: this.getNewId(),
        show: true,
        ...message
      })
    },
    hideMessage(id) {
      this.findMessage(id).show = false
      setTimeout(() => {
        this.removeMessage(id)
      }, 300)
    },
    setHideTimer(id, timer) {
      setTimeout(() => {
        this.hideMessage(id)
      }, timer)
    }
  },
})
