"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_SERVER!
);

export default function ChatPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [roomId]);

  if (!roomId) {
    return <div>Carregando...</div>;
  }

  function sendMessage() {
    if (!message.trim()) return;

    socket.emit("message", {
      roomId,
      message,
    });

    setMessage("");
  }

  return (
    <div>
      <h1>Sala: {roomId}</h1>

      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>
        Enviar
      </button>
    </div>
  );
}