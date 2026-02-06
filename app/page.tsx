"use client";
import { useState } from "react";

export default function Home() {
  const [inteira, setInteira] = useState([]);
  const [title, setTitle] = useState("titulo");
  const [text, setText] = useState("corpo da pergunta");
  const [respostas, setRespostas] = useState("Respostas");
  const [questao, setQuestao] = useState("");
  const [tema, setTema] = useState("");

  async function main() {
    console.log("função sendo feita");
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({
        questao: questao,
        tema: tema,
      }),
    });
    const data = await res.json();
    const partes = data.text.split("#");

    setTitle(partes[0]);
    setText(partes[1]);
    setRespostas(partes[2]);
    setInteira(partes);
  }

  return (
    <div>
      <h1 className="text-[3rem]">Adaptil</h1>
      <img className="h-30" src="https://images.vexels.com/media/users/3/251466/isolated/preview/fafde6dbfc92729d7f41feea95134849-chameleonhandraw-0.png" alt="" />
      <p>Pergunta</p>
      <input
        type="text"
        className="border-black border rounded-md"
        onChange={(e) => setQuestao(e.target.value)}
      />
      <br />
      <br />
      <p>Tema</p>
      <input
        type="text"
        className="border-black border rounded-md"
        onChange={(e) => setTema(e.target.value)}
      />

      <br />
      <br />
      <button
        onClick={main}
        className="cursor-crosshair bg-green-300 rounded-md hover: bg-blue-400"
      >
        Perguntar
      </button>
      <hr />
      <br />
      <br />
      <h1 className="text-4xl text-red-600"> {title}</h1>
      <br />
      <h2 className="text-2xl text-green-600"> {text}</h2>
      <br />
      <h3 className="text-1xl ">{respostas} </h3>
    </div>
  );
}
