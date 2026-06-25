import React, { useState , useEffect } from "react";
import { getTodos } from "./services/todoService.js";
import AppName from "./components/AppName.jsx";
import Button from "./components/Button.jsx";
import InputField from "./components/InputField.jsx";
export default function App() {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchTodos();
  }, []); 

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTask(data.todoItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppName />
      <InputField task={task} setTask={setTask} />
      {loading && (
      <p className="text-center text-lg font-semibold mt-4">
        Loading Todos...
      </p>
    )}
    </div>
  );
}
