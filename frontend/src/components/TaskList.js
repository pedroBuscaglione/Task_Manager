import React, { useEffect, useState } from "react";
import socket from "../services/socket";
import axios from "axios";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Carrega as tarefas na primeira vez
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  // Ouve eventos em tempo real
  useEffect(() => {
    socket.on("taskCreated", (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    // limpeza para evitar múltiplos listeners
    return () => {
      socket.off("taskCreated");
    };
  }, []);

  return (
    <div>
      <h2>📋 Minhas Tarefas</h2>
      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
