const Task = require("../models/Task");
const { sendCompletionEmail } = require("../utils/emailService");

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ creationDate: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    req.app.get("io").emit("taskCreated", task);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    // Build update object with only provided fields
    const updateData = {};

    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.description !== undefined)
      updateData.description = req.body.description;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updateData, // Use filtered data instead of req.body
      { new: true, runValidators: false }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Send email only when status changes to 'Completed'
    if (task.status === "Completed" && req.body.status === "Completed") {
      await sendCompletionEmail(task);
    }

    req.app.get("io").emit("taskUpdated", task);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    req.app.get("io").emit("taskDeleted", task._id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};
