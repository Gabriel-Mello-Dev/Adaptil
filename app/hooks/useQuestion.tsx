"use client";
import { useState } from "react";

export function useQuestion() {
  const [title, setTitle] = useState("titulo");
  const [text, setText] = useState("corpo da pergunta");
  const [respostas, setRespostas] = useState<string[]>([]);
  const [correta, setCorreta] = useState(0);
  const [perguntando, setPerguntando] = useState(false);

  async function gerarPergunta(questao: string, tema: string) {
    try {
      setPerguntando(true);

      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ questao, tema }),
      });

      const data = await res.json();
      const partes = data.text.split("#");

      const alternativas = partes[2]?.split("§").map((a: string) => a.trim());

      setTitle(partes[0]);
      setText(partes[1]);
      setRespostas(alternativas);
      setCorreta(Number(partes[3].replace("correta:", "").trim()));
    } finally {
      setPerguntando(false);
    }
  }

  function verificar(escolhida: number) {
    return escolhida === correta;
  }

  return {
    title,
    text,
    respostas,
    correta,
    perguntando,
    gerarPergunta,
    verificar,
  };
}