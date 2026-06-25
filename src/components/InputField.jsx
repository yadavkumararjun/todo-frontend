import React from "react";
import { useState } from "react";
import Button from "./Button.jsx";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../services/todoService";

export default function InputField({ task, setTask }) {
  const [taskName, setTaskName] = React.useState("");
  const [Taskdate, setTaskDate] = React.useState("");

  // Add Task
  const handleAddTask = async () => {
    if (taskName.trim() === "" || Taskdate.trim() === "") {
      alert("Please enter a task and date");
      return;
    }

    try {
      const data = await addTodo({
        task: taskName,
        date: Taskdate,
      });

      setTask([...task, data.todo]);

      setTaskName("");
      setTaskDate("");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id);

      setTask(task.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle Complete
  const handleComplete = async (id) => {
    try {
      const data = await toggleTodo(id);

      setTask(
        task.map((t) =>
          t&& t._id === id ? data.todoItem : t
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Input Section */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex flex-col">
          <label
            htmlFor="task"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Task
          </label>

          <input
            id="task"
            type="text"
            placeholder="Enter task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Due Date
          </label>

          <input
            id="date"
            type="date"
            value={Taskdate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <Button name="Add Task" onClick={handleAddTask} />

      {/* Pending Tasks */}
      <div className="mt-8">
        

        {task
          .filter((t) => t && !t.completed)
          .map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center w-96 mx-auto border p-3 mb-2 rounded"
            >
              <div>
                <span>{t.task}</span>
                <span className="ml-4">
                  {new Date(t.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleComplete(t._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Complete
                </button>
                
                <button
                  onClick={() => handleDeleteTask(t._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {task
          .filter((t) => t && t.completed)
          .map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center w-96 mx-auto border p-3 mb-2 rounded bg-gray-100"
            >
              <div>
                <span className="line-through text-gray-500">
                  {t.task}
                </span>

                <span className="ml-4">
                  {new Date(t.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleComplete(t._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Undo
                </button>

                <button
                  onClick={() => handleDeleteTask(t._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}