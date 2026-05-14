"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoomPage() {
  const socketServer = process.env.NEXT_PUBLIC_SOCKET_SERVER!;
  const [roomId, setRoomId] = useState("");

  const router = useRouter();

  async function enterRoom() {
    const response = await fetch(`${socketServer}/room/${roomId}`);

    const data = await response.json();

    if (!data.exists) {
      alert("Sala não encontrada");
      return;
    }

    console.log(roomId);
    router.push(`/pages/Room/Chat/${roomId}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Entrar na Sala</h1>

      <input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value.toUpperCase())}
        placeholder="Código da sala"
      />

      <button onClick={enterRoom}>Entrar</button>
    </div>
  );
}
