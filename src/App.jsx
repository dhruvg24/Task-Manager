import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { reorderTasks } from './features/tasks/tasksSlice';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    dispatch(reorderTasks(reordered));
  };

  const filteredTasks = tasks
    .filter(task => task.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(task => statusFilter === 'All' || task.status === statusFilter);

  return (
    <div className="App">
      <h1>Task Management Dashboard (Redux)</h1>
      <TaskForm />
      <SearchBar setSearchQuery={setSearchQuery} />
      <div>
        <label>Filter by Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Done</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} handleDragEnd={handleDragEnd} />
    </div>
  );
}

export default App;
