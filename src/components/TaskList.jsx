import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask, toggleStatus } from '../features/tasks/tasksSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function TaskList({ tasks, handleDragEnd }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  const startEditing = (task) => {
    setEditingId(task.id);
    setNewName(task.name);
  };

  const saveEdit = (task) => {
    dispatch(updateTask({ ...task, name: newName }));
    setEditingId(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {editingId === task.id ? (
                      <>
                        <input 
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                        />
                        <button onClick={() => saveEdit(task)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <strong>{task.name}</strong> <br />
                        Status: {task.status} <button onClick={() => dispatch(toggleStatus(task.id))}>Toggle</button> <br />
                        Due: {task.dueDate || "N/A"} <br />
                        Priority: {task.priority} <br />
                        <button onClick={() => startEditing(task)}>Edit</button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                      </>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
