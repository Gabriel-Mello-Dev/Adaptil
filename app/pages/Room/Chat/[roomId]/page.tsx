"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER!);

export default function ChatPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const mockUsers = ["Gabriel", "Lucas", "Ana", "Pedro", "Maria", "João"];

  const user = {
    // eslint-disable-next-line react-hooks/purity
    nome: mockUsers[Math.floor(Math.random() * mockUsers.length)],
  };
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

    setMessage("Gabriel:" + message);
    const timeStamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("mensagem:" + message);
    socket.emit("message", {
      roomId,
message: user.nome + ": " + message + "\nEnviado em: " + timeStamp,
    });

    setMessage("");
  }

  return (
    <div>
      <h1>Sala: {roomId}</h1>

      <div className="fixed bottom-4 left-4 w-80 h-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700">
          <h2 className="text-white font-semibold">Chat</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-zinc-800 text-white px-3 py-2 rounded-xl w-fit max-w-[80%]"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-zinc-700 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-xl outline-none"
            placeholder="Digite uma mensagem..."
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
