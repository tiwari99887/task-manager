const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} = require('../controllers/taskController');
const { validateTask } = require('../middleware/validation');

// Route: /api/tasks
router.route('/')
  .get(getTasks)                    // GET all tasks
  .post(validateTask, createTask);  // POST create task (with validation)

// Route: /api/tasks/:id
router.route('/:id')
  .put(updateTask)    // PUT update task (with validation)
  .delete(deleteTask);              // DELETE task

module.exports = router;
