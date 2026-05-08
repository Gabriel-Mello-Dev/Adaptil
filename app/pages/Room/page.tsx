"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;

const socket: Socket = io(socketServer);

export default function Home() {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado:", socket.id);
    });

    socket.on("mensagem", (msg: string) => {
      setMensagens((prev) => [...prev, msg]);
      console.log(mensagens);
    });

    return () => {
      socket.off("mensagem");
    };
  }, []);

  function enviarMensagem() {
    if (!mensagem.trim()) return;
    console.log("enviado");
    socket.emit("mensagem", mensagem);

    setMensagem("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Chat Socket.IO</h1>

      <input
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite..."
      />

      <button onClick={enviarMensagem}>Enviar</button>

      <hr />

      {mensagens.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
