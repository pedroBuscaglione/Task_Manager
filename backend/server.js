const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Cria servidor HTTP a partir do Express
const server = http.createServer(app);

// Conecta o Socket.IO ao servidor
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend
    methods: ["GET", "POST"]
  }
});

// Evento de conexão
io.on("connection", (socket) => {
  console.log("🔌 Novo cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

// Exemplo de rota (ao salvar tarefa)
app.post("/api/tasks", async (req, res) => {
  const task = req.body;

  // aqui você salvaria no MongoDB
  // const newTask = await Task.create(task);

  // envia para todos os clientes conectados
  io.emit("taskCreated", task);

  res.status(201).json(task);
});

server.listen(5000, () => console.log("✅ Backend rodando na porta 5000"));
