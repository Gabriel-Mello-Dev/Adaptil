import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Conectado:", socket.id);

  socket.on("mensagem", (msg) => {
    io.emit("mensagem", msg);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO rodando na 4000");
});
