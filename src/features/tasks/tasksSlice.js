import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleStatus: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload);
      if (index !== -1) {
        state.tasks[index].status = state.tasks[index].status === 'Pending' ? 'Done' : 'Pending';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
});

export const { addTask, updateTask, deleteTask, toggleStatus, reorderTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
