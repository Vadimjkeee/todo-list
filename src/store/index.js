import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    }
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask(state, { index, task }) {
      state.tasks[index] = task;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask(state, id) {
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      state.tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  }
})

export default store

