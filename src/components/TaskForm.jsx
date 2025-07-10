import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const dispatch = useDispatch();


    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!taskName.trim() || !dueDate){
            alert('Please fill in all the fields');
            return;
        }
        dispatch(addTask({
            id: Date.now(), 
            name: taskName, 
            status: 'Pending',
            dueDate, 
            priority
        }))
        console.log('Task added');     
        // reset the form
        setTaskName('');
        setDueDate('');
        setPriority('low');

    }
  return (
    <div>
        <form onSubmit = {handleSubmit}> 
            <input type='text' value={taskName} onChange={(e)=>setTaskName(e.target.value)} placeholder='enter task name'/>
            <input type='date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)} placeholder='enter date'/>
            {/* priority - options[low, med, high] */}
            <select value={priority} onChange={(e)=>setPriority(e.target.value)} placeholder='select priority'>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
            </select>
            <button type='submit'>
                Add Task
            </button>
        </form>
    </div>
  )
}

export default TaskForm