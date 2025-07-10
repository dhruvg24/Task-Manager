import { createSlice } from "@reduxjs/toolkit";

// we will have status of tasks as pending, completed.

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  // get from local storage
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      state.tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      // filter out the task with given id, and render all remaining ones - will remove the task with given id.
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const idx = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (idx !== -1) {
        state.tasks[idx] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleStatus: (state, action) => {
      // find index
      const idx = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (idx !== -1) {
        state.tasks[idx].status === "Pending" ? "Completed" : "Pending";
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, reorderTasks, toggleStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;

