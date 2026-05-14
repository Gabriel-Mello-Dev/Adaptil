"use client";

import { useRouter } from "next/navigation";

const socketServer =
  process.env.NEXT_PUBLIC_SOCKET_SERVER!;

export default function CreateRoomPage() {
  const router = useRouter();

  async function createRoom() {
    const response = await fetch(
      `${socketServer}/create-room`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    router.push(`/pages/Room/Chat/${data.roomId}`);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Criar Sala</h1>

      <button onClick={createRoom}>
        Criar sala
      </button>
    </div>
  );
}