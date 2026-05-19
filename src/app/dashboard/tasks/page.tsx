"use client";

import React, { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Auto Pending if due date passed
  useEffect(() => {
    const updatedTasks = tasks.map((task) => {
      const today = new Date().toISOString().split("T")[0];

      if (
        task.status === "In Progress" &&
        task.dueDate < today
      ) {
        return {
          ...task,
          status: "Pending" as const,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }, []);

  // Add Task
  const handleAddTask = () => {
    if (
      !newTask.title ||
      !newTask.description
    ) {
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate || today,
      status: "Pending",
    };

    setTasks([task, ...tasks]);

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  // Delete Task
  const handleDelete = (id: number) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };

  // Start Task
  const handleStartTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "In Progress",
            }
          : task
      )
    );
  };

  // Complete Task
  const handleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
            }
          : task
      )
    );
  };

  // Edit Status
  const handleEditStatus = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status:
              task.status === "Completed"
                ? "In Progress"
                : "Pending",
          };
        }

        return task;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Tasks
          </h1>
        </div>

        {/* Add Task */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10 border border-gray-100">
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Task
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
              className="px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
              className="px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  dueDate: e.target.value,
                })
              }
              className="px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleAddTask}
            className="mt-5 px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition-all"
          >
            Add Task
          </button>
        </div>

        {/* Tasks */}
        <section className="space-y-6">
          
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between rounded-lg shadow-md p-6 border-l-4 gap-6 bg-white transition-all duration-300"
              style={{
                borderColor:
                  task.status === "Completed"
                    ? "green"
                    : task.status === "In Progress"
                    ? "orange"
                    : "red",
              }}
            >
              
              {/* Left */}
              <div className="flex flex-col">
                
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {task.description}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Due Date: {task.dueDate}
                </p>
              </div>

              {/* Right */}
              <section className="flex flex-wrap gap-3">
                
                {/* Status */}
                <span
                  className={`px-4 py-2 text-sm rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {task.status}
                </span>

                {/* Start */}
                {task.status === "Pending" && (
                  <button
                    onClick={() =>
                      handleStartTask(task.id)
                    }
                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Start Task
                  </button>
                )}

                {/* Complete */}
                {task.status !== "Completed" && (
                  <button
                    onClick={() =>
                      handleComplete(task.id)
                    }
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}

                {/* Edit */}
                <button
                  onClick={() =>
                    handleEditStatus(task.id)
                  }
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() =>
                    handleDelete(task.id)
                  }
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Delete
                </button>
              </section>
            </div>
          ))}

          {/* Empty */}
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks available.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Tasks;