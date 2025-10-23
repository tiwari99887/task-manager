import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // Initialize as empty array
  const [filter, setFilter] = useState("All");
  const [socket, setSocket] = useState(null);

  // Initialize Socket.IO
  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });

    socketInstance.on("taskCreated", (newTask) => {
      console.log("Task created:", newTask);
      setTasks((prev) => [...prev, newTask]);
    });

    socketInstance.on("taskUpdated", (updatedTask) => {
      console.log("Task updated:", updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socketInstance.on("taskDeleted", (taskId) => {
      console.log("Task deleted:", taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Load initial tasks - FIX APPLIED HERE
  useEffect(() => {
    getTasks()
      .then((response) => {
        console.log("Full response:", response);
        console.log("Response.data:", response.data);

        // Handle nested response structure
        // If your API returns { data: [...] }
        const tasksArray =
          response.data.data || response.data.tasks || response.data;

        // Ensure it's an array before setting state
        if (Array.isArray(tasksArray)) {
          setTasks(tasksArray);
          console.log("Tasks loaded:", tasksArray);
        } else {
          console.error("API did not return an array:", tasksArray);
          setTasks([]);
        }
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
        setTasks([]); // Set empty array on error to prevent crashes
      });
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      console.log("Task creation request sent");
    } catch (err) {
      console.error("Error creating task:", err);
      alert(
        `Failed to create task: ${err.response?.data?.message || err.message}`
      );
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      console.log("Attempting to update task content:", id, updatedData);
      const response = await updateTask(id, updatedData);
      console.log("Task content update successful:", response.data);
    } catch (err) {
      console.error("Error updating task content:", err);
      console.error("Server error details:", err.response?.data);
      alert(
        `Failed to update task: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      console.log("Attempting to update task:", id, "with status:", status);
      const response = await updateTask(id, { status });
      console.log("Task update successful:", response.data);
    } catch (err) {
      console.error("Error updating task:", err);

      // THIS IS THE CRITICAL PART - Log the actual server error
      console.error("Server error details:", err.response?.data);
      console.error("Status code:", err.response?.status);
      console.error("Request payload was:", { status });

      alert(
        `Failed to update task: ${err.response?.data?.error || err.message}`
      );
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      console.log("Task delete request sent");
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <div className="container">
        <TaskForm onSubmit={handleCreateTask} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={tasks}
          filter={filter}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask} 
        />
      </div>
    </div>
  );
}

export default App;
