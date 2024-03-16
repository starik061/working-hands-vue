import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    user: {
      name: 'Антон',
      coins: 1000
    },
    tasks: [],
    results: []
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getResults: (state) => state.results,
    getAccountInfo: (state) => state.user
  },
  actions: {
    changeTasks(taskData) {
      this.tasks = taskData
    },
    changeResults(res) {
      this.results.push(res)
    }
  }
})
