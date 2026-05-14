"use client";

import Link from "next/link";

export default function RoomMenuPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Salas</h1>

        <div className="flex flex-col gap-4">
          <Link href="/pages/Room/Create">
            <button className="w-full bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl py-3 font-medium cursor-pointer">
              Criar Sala
            </button>
          </Link>

          <Link href="/pages/Room/Entry">
            <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl py-3 font-medium cursor-pointer">
              Entrar em Sala
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
