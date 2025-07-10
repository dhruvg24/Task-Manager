import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
// 1. Creating store for task management
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
});

export default store;
