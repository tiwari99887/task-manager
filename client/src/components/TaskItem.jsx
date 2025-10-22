import React from 'react';

function TaskItem({ task, onUpdateStatus, onDelete }) {
  const handleMarkInProgress = () => {
    console.log('Marking as In Progress');
    console.log('Current status:', task.status);
    console.log('Task ID:', task._id);
    onUpdateStatus(task._id, 'In Progress');
  };

  const handleMarkComplete = () => {
    console.log('Marking as Completed');
    console.log('Current status:', task.status);
    console.log('Task ID:', task._id);
    onUpdateStatus(task._id, 'Completed');
  };

  const handleReopen = () => {
    console.log('Reopening task');
    console.log('Current status:', task.status);
    console.log('Task ID:', task._id);
    onUpdateStatus(task._id, 'To Do');
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>
        {task.status}
      </span>
      <div className="task-actions">
        {/* Show buttons based on current status */}
        {task.status === 'To Do' && (
          <>
            <button onClick={handleMarkInProgress} className="btn-progress">
              Mark In Progress
            </button>
            <button onClick={handleMarkComplete} className="btn-complete">
              Mark Complete
            </button>
          </>
        )}
        
        {task.status === 'In Progress' && (
          <>
            <button onClick={handleMarkComplete} className="btn-complete">
              Mark Complete
            </button>
            <button onClick={handleReopen} className="btn-reopen">
              Back to To Do
            </button>
          </>
        )}
        
        {task.status === 'Completed' && (
          <button onClick={handleReopen} className="btn-reopen">
            Reopen
          </button>
        )}
        
        <button onClick={() => onDelete(task._id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
