import React, { useState, useEffect, useRef } from 'react';
import '../TaskItem.css';

function TaskItem({ task, onUpdateStatus, onDelete, onUpdate }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedContent, setEditedContent] = useState(task.description || '');
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleEditClick = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    onDelete(task._id);
  };

  const handleSave = async () => {
    await onUpdate(task._id, { 
      title: editedTitle, 
      description: editedContent
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedContent(task.description || '');
    setIsEditing(false);
  };

  const getStatusButtons = () => {
    switch (task.status) {
      case 'Completed':
        return (
          <button onClick={() => onUpdateStatus(task._id, 'To Do')} className="reopen-btn">
            Reopen
          </button>
        );
      case 'In Progress':
        return (
          <>
            <button onClick={() => onUpdateStatus(task._id, 'Completed')} className="complete-btn">
              Mark Complete
            </button>
            <button onClick={() => onUpdateStatus(task._id, 'To Do')} className="back-btn">
              Back to To Do
            </button>
          </>
        );
      default:
        return (
          <button onClick={() => onUpdateStatus(task._id, 'In Progress')} className="progress-btn">
            Start
          </button>
        );
    }
  };

  if (isEditing) {
    return (
      <div className="task-card">
        <div className="edit-mode">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-title-input"
            placeholder="Task Title"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-content-textarea"
            placeholder="Task Description"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="menu-wrapper" ref={menuRef}>
          <button 
            className="three-dot-menu" 
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Task options"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick} className="delete-menu-item">Delete</button>
            </div>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="task-content">{task.description}</p>
      )}
      
      <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
        {task.status}
      </span>
      
      <div className="task-actions">
        {getStatusButtons()}
      </div>
    </div>
  );
}

export default TaskItem;
