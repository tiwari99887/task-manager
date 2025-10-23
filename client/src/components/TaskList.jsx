import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, filter, onUpdateStatus, onDelete, onUpdate }) {
  // Add safety check: ensure tasks is always an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  
  const filterTasks = () => {
    if (filter === 'All') return safeTasks;
    return safeTasks.filter(task => task.status === filter);
  };

  const filteredTasks = filterTasks();

  return (
    <div className="task-list">
      {filteredTasks.length === 0 ? (
        <p className="no-tasks">No tasks found</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            onUpdate={onUpdate} 
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
